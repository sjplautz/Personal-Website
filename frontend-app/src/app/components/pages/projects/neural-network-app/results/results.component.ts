import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app/neural-network-app.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [

    trigger('enterTrigger', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('500ms ease-out',
          style({ opacity: 1 })
        )
      ]),
    ]),

    trigger('waitForPostTrigger', [
      transition(':enter', [
        style({
          'height': 0,
          'opacity': 0
        }),
        animate('1s ease-out',
          style({ opacity: 1 })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-in',
          style({ height: 0, opacity: 0 })
        )
      ]),
    ]),

  ],

})
export class ResultsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[];
  public currentPostResponse: any;

  constructor(public appSvc: NeuralNetworkAppService, private elRef: ElementRef) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(this.appSvc.ShowResultsEmitter.subscribe(
      response => {
        this.currentPostResponse = response;
        if(window.innerWidth < 755)
          setTimeout(() => {this.elRef.nativeElement.scrollIntoView({behavior: "smooth"});}, 300);
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription !== undefined) {
        subscription.unsubscribe()
      }
    })
  }

  checkForVowel() {
    var letter = this.currentPostResponse.guess1['category'][0]
    return ['a', 'e', 'i', 'o', 'u'].includes(letter)
  }

}
