import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app/neural-network-app.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accuracy',
  templateUrl: './accuracy.component.html',
  styleUrls: ['./accuracy.component.scss'],
  animations: [
    trigger('leaveTrigger', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('850ms ease-in',
          style({ height: 0, opacity: 0 }),
        )
      ])
    ]),
  ]
})
export class AccuracyComponent implements OnInit, OnDestroy, OnChanges {
  private subscriptions: Subscription[];
  public accuracy: Number;
  public renderAccuracy: boolean;

  constructor(public appSvc: NeuralNetworkAppService) {
    this.subscriptions = [];
    this.renderAccuracy = false;
  }

  ngOnInit(): void {
    this.accuracy = (this.appSvc.accuracy["correct"] / (this.appSvc.accuracy["correct"] + this.appSvc.accuracy["incorrect"]))
    
    this.subscriptions.push(this.appSvc.RenderAccuracyEmitter.subscribe(
      data => {
        setTimeout(() => {this.renderAccuracy = true}, 1500);
      }))


    this.subscriptions.push(this.appSvc.DeRenderAccuracyEmitter.subscribe(
      data => {
        setTimeout(() => {this.renderAccuracy = false}, 2500);
      }))
  }

  ngOnChanges(): void {
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
