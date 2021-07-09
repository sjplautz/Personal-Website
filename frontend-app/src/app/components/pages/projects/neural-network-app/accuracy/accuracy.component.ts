import { Component, OnDestroy, OnInit } from '@angular/core';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app/neural-network-app.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accuracy',
  templateUrl: './accuracy.component.html',
  styleUrls: ['./accuracy.component.scss']
})
export class AccuracyComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[];
  public accuracy: Number;

  constructor(public appSvc: NeuralNetworkAppService) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.accuracy = (this.appSvc.accuracy["correct"] / (this.appSvc.accuracy["correct"] + this.appSvc.accuracy["incorrect"]))
  }

  ngOnChange(): void {
    return;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription !== undefined) {
        subscription.unsubscribe()
      }
    })
  }

}
