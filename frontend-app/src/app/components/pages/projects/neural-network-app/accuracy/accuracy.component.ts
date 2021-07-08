import { Component, OnDestroy, OnInit } from '@angular/core';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accuracy',
  templateUrl: './accuracy.component.html',
  styleUrls: ['./accuracy.component.scss']
})
export class AccuracyComponent implements OnInit, OnDestroy {

  private apiResource: string;
  private subscriptions: Subscription[];
  
  public currentGetResponse: any;

  constructor(public appSvc: NeuralNetworkAppService) {
    this.apiResource = "database/nn-app-accuracy";
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(this.appSvc.GetResponseEmitter.subscribe(
      response => {
        this.currentGetResponse = response;
      }));

    // might need to do some magic to avoid rendering before having results
    this.apiGet();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription !== undefined) {
        subscription.unsubscribe()
      }
    })
  }

  apiGet() {
    this.appSvc.apiGet(this.apiResource);
  }

}
