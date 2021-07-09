import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app/neural-network-app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-neural-network-app',
  templateUrl: './neural-network-app.component.html',
  styleUrls: ['./neural-network-app.component.scss'],
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
export class NeuralNetworkAppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[];
  public renderResults: boolean;
  public renderFeedback: boolean;

  constructor(public appSvc: NeuralNetworkAppService) {
    this.subscriptions = [];
    this.renderResults = false;
    this.renderFeedback = false;
  }

  ngOnInit(): void {
    this.subscriptions.push(this.appSvc.RenderResultsEmitter.subscribe(
      data => {
        this.renderResults = true;
      }))

    this.subscriptions.push(this.appSvc.RenderFeedbackEmitter.subscribe(
      data => {
        this.renderFeedback = true;
      }))

    this.subscriptions.push(this.appSvc.DeRenderResultsEmitter.subscribe(
      data => {
        this.renderResults = false;
      }))

    this.subscriptions.push(this.appSvc.DeRenderFeedbackEmitter.subscribe(
      data => {
        this.renderFeedback = false;
      }))

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription !== undefined) {
        subscription.unsubscribe()
      }
    })
  }

}