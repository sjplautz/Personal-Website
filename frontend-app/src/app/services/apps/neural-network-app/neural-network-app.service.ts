import { Injectable } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Subject, Subscription } from 'rxjs';
import { NeuralNetworkApiService } from './neural-network-api.service';
import { NeuralNetworkDbService } from './neural-network-db.service';

@Injectable({
  providedIn: 'root',
})
export class NeuralNetworkAppService {
  private subscriptions: Subscription[];

  // globally accessed properties
  public accuracy: any;
  public selectedImg: any;
  public predictedImg: string;
  public resultsLoading: boolean;

  public RenderResultsEmitter = new Subject<{}>();
  public ShowResultsEmitter = new Subject<{}>();
  public RenderFeedbackEmitter = new Subject<{}>();
  public DeRenderFeedbackEmitter = new Subject<{}>();
  public DeRenderResultsEmitter = new Subject<{}>();


  constructor(public apiSvc: NeuralNetworkApiService, public dbSvc: NeuralNetworkDbService) { 
    this.selectedImg = "";
    this.predictedImg = "";
    this.resultsLoading = true;
    this.subscriptions = [];
    this.init()
  }

  init(): void {
    this.dbSvc.apiGet()
    this.subscriptions.push(this.dbSvc.GetResponseEmitter.subscribe(
      data => {
        this.onAccuracyLoaded(data);
      }
    ));

    this.subscriptions.push(this.apiSvc.PostResponseEmitter.subscribe(
      data => {
        this.onResultsReceived(data);
      }));
  }

  onAccuracyLoaded(data: JSON){
    this.accuracy = data;
  }

  onImageSelected(dataUrl: string) {
    this.selectedImg = dataUrl;
    this.resultsLoading = true;
    this.RenderResultsEmitter.next();

    var payload = JSON.stringify({ "url" : dataUrl })
    this.apiSvc.apiPost(JSON.parse(payload))
  }

  onSafeUrlSelected(safeUrl: SafeUrl) {
    this.selectedImg = safeUrl;
    this.resultsLoading = true;
    this.RenderResultsEmitter.next();

    var payload = JSON.stringify({ "url" : safeUrl['changingThisBreaksApplicationSecurity'] })
    this.apiSvc.apiPost(JSON.parse(payload))
  }

  onResultsReceived(data: JSON){
    this.predictedImg = this.getPredictedImg(data)
    this.resultsLoading = false;
    // show the results in subscribed components
    this.ShowResultsEmitter.next(data)
    // render the feedback component
    this.RenderFeedbackEmitter.next();
  }

  getPredictedImg(data: JSON){
    var category = data['guess1']['category']
    var flowerImg = category.replaceAll(' ', "_") + ".jpeg";
    return "/assets/flowers-2/" + flowerImg;
  }

  async onFeedbackSubmitted(result: string){
    var payload = JSON.stringify({ "feedback" : result})
    this.dbSvc.apiPost(JSON.parse(payload))
    this.DeRenderFeedbackEmitter.next();
    this.DeRenderResultsEmitter.next();
  }

}