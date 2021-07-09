import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public PostResponseEmitter = new Subject<any>();
  public GetResponseEmitter = new Subject<any>();
  public postResponses: Observable<any>;
  public getResponses: Observable<any>;

  private subscriptions: Subscription[];

  constructor(public http: HttpService) { 
    this.subscriptions = [];
  }

  // perform a GET request
  apiGet(apiResource: string) {
    this.getResponses = this.http.get(apiResource);

    this.subscriptions.push(this.getResponses.subscribe(response => {
      console.log("GET to:", apiResource, "\nresponse:\n", response);
      this.GetResponseEmitter.next(response);
    }))
  }

  // perform a POST request
  apiPost(apiResource: string, data: JSON) {
    this.postResponses = this.http.post(apiResource, data);

    this.subscriptions.push(this.postResponses.subscribe(response => {
      console.log("POST to:", apiResource, "\nresponse:\n", response);
      this.PostResponseEmitter.next(response);
    }))
  }

}
