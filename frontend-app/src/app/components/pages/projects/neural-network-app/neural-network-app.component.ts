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
  public imageSelected: string;
  private subscriptions: Subscription[]; 
  

  constructor(public appSvc: NeuralNetworkAppService) { 
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(this.appSvc.showImageEmitter.subscribe(
      data => {
        this.imageSelected = data.show;
      }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      if(subscription !== undefined){
        subscription.unsubscribe()
      }
    }) 
  }
  
}