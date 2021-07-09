import { Injectable } from '@angular/core';
import { ApiService } from 'app/services/shared/api.service';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NeuralNetworkApiService {
  public PostResponseEmitter = new Subject<any>();

  private apiResource: string;
  private subscriptions: Subscription[];

  constructor(private apiSvc: ApiService) {
    this.apiResource = "neural-network-app";
    this.subscriptions = [];
    this.init()
  }

  // perform a POST request
  apiPost(data: JSON) {
    this.apiSvc.apiPost(this.apiResource, data)
  }

  init(): void{
    // need to push
    this.subscriptions.push(this.apiSvc.PostResponseEmitter.subscribe(
      response => {
        // only handle on-topic api responses
        if(response.topic == this.apiResource){
          this.PostResponseEmitter.next(response)
        }
      }
    ))
  }

}
