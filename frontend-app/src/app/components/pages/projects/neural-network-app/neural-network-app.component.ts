import { Component, OnDestroy, OnInit } from '@angular/core';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-neural-network-app',
  templateUrl: './neural-network-app.component.html',
  styleUrls: ['./neural-network-app.component.scss'],
  providers: [NeuralNetworkAppService],
})
export class NeuralNetworkAppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[];
  public imgChosen: boolean;

  constructor(public appSvc: NeuralNetworkAppService) {
    this.subscriptions = [];
    this.imgChosen = false;
  }

  ngOnInit(): void {
    this.subscriptions.push(this.appSvc.ImageChosenEmitter.subscribe(
      data => {
        this.imgChosen = true;
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