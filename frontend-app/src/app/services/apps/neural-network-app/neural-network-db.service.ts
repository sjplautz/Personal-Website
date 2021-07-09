import { Injectable } from '@angular/core';
import { ApiService } from 'app/services/shared/api.service';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NeuralNetworkDbService {
  public PostResponseEmitter = new Subject<any>();
  public GetResponseEmitter = new Subject<any>();

  private apiResource: string;
  private subscriptions: Subscription[];

  constructor(private apiSvc: ApiService) {
    this.apiResource = "database/nn-app-accuracy";
    this.subscriptions = [];
    this.init()
  }

  init(): void{
    this.subscriptions.push(this.apiSvc.PostResponseEmitter.subscribe(
      response => {
        // only handle on-topic api responses
        if(response.topic == this.apiResource){
          this.PostResponseEmitter.next(response)
          this.apiSvc.apiGet(this.apiResource)
        }
      }
    ));

    this.subscriptions.push(this.apiSvc.GetResponseEmitter.subscribe(
      response => {
        // only handle on-topic api responses
        if(response.topic == this.apiResource){
          this.GetResponseEmitter.next(response)
        }
      }
    ));
  }

  // perform GET to nn-app-db
  apiGet(){
    this.apiSvc.apiGet(this.apiResource)
  }

  // perform POST to nn-app-db
  async apiPost(data: JSON) {
    this.apiSvc.apiPost(this.apiResource, data)
  }


}