import { Injectable } from '@angular/core';
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
  public selectedImg: string;
  public resultsLoading: boolean;

  public RenderResultsEmitter = new Subject<{}>();
  public ShowResultsEmitter = new Subject<{}>();
  public RenderFeedbackEmitter = new Subject<{}>();
  public DeRenderFeedbackEmitter = new Subject<{}>();
  public DeRenderResultsEmitter = new Subject<{}>();


  constructor(public apiSvc: NeuralNetworkApiService, public dbSvc: NeuralNetworkDbService) { 
    this.selectedImg = "";
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

  onResultsReceived(data: JSON){
    this.resultsLoading = false;
    // show the results in subscribed components
    this.ShowResultsEmitter.next(data)
    // render the feedback component
    this.RenderFeedbackEmitter.next();
  }

  async onFeedbackSubmitted(result: string){
    var payload = JSON.stringify({ "feedback" : result})
    this.dbSvc.apiPost(JSON.parse(payload))
    this.DeRenderFeedbackEmitter.next();
    this.DeRenderResultsEmitter.next();
  }


}