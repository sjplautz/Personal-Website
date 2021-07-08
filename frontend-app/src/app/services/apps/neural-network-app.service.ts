import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { HttpService } from '../shared/http.service';

@Injectable({
  providedIn: 'root'
})
export class NeuralNetworkAppService implements OnInit, OnDestroy {
  // BehaviorSubjects to avoid late subscriber problem
  public ResultsRenderEmitter = new BehaviorSubject<any>("");
  public ImageChosenEmitter = new Subject<{}>();
  public PostResponseEmitter = new Subject<any>();
  public GetResponseEmitter = new Subject<any>();

  public postResponses: Observable<any>;
  public getResponses: Observable<any>;
  private subscriptions: Subscription[];

  public cachedResultsSubject: any;
  public hasPrediction: boolean;
  public hasGet: boolean;

  constructor(public http: HttpService) {
    this.hasPrediction = false;
    this.hasGet = false;
    this.subscriptions = [];
  }

  onImageSelected(dataUrl: string) {
    this.ImageChosenEmitter.next({});
    if(!this.cachedResultsSubject){
      this.cachedResultsSubject = { src: dataUrl };
    } 
    this.ResultsRenderEmitter.next({ src: dataUrl });
  }

  // perform a GET request
  apiGet(apiResource: string) {
    this.hasGet = false;
    this.getResponses = this.http.get(apiResource);

    this.subscriptions.push(this.getResponses.subscribe(response => {
      this.hasGet = true;
      console.log("GET to:", apiResource, "\nresponse:\n", response);
      this.GetResponseEmitter.next(response);
    }))
  }

  // perform a POST request
  apiPost(apiResource: string, data: JSON) {
    // has the intended side effect of de-rendering feedback section upon submission
    this.hasPrediction = false;
    this.postResponses = this.http.post(apiResource, data);

    this.subscriptions.push(this.postResponses.subscribe(response => {
      if(apiResource == "neural-network-app")
        this.hasPrediction = true;
      console.log("POST to:", apiResource, "\nresponse:\n", response);
      this.PostResponseEmitter.next(response);
    }))
  }

  ngOnInit(): void{
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription !== undefined) {
        subscription.unsubscribe()
      }
    })
  }

}
