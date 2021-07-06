import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app.service';
import { HttpService } from 'app/services/shared/http.service';

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
      ])
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
        style({ 'opacity': 1 }),
        animate('500ms ease-in',
          style({ height: 0, opacity: 0 })
        )
      ]),
    ]),

  ],

})
export class ResultsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[];

  public currentGetResponse: any;
  public currentPostResponse: any;

  public postState: string
  public imageChosen: boolean;
  private apiResource: string;
  private payload: any;
  public selectedImage: string;


  constructor(public appSvc: NeuralNetworkAppService, public http: HttpService) {
    this.postState = 'inactive';
    this.imageChosen = false;
    this.apiResource = "neural-network-app";
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(this.appSvc.ResultsRenderEmitter.subscribe(
      data => {
        this.payload = { "title": "carousel image", "url": data.src }
        this.selectedImage = data.src;
        this.apiPost(this.payload);
      }));

    this.subscriptions.push(this.appSvc.PostResponseEmitter.subscribe(
      response => {
        this.currentPostResponse = response;
        this.currentPostResponse['guess1'].confidence = this.prettyConfidence(this.currentPostResponse['guess1'].confidence)
        this.postState = 'finished';
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription !== undefined) {
        subscription.unsubscribe()
      }
    })
  }

  // perform a get request to the flower API
  apiGet() {
    // clear cached get response first
    this.currentGetResponse = null;
    this.appSvc.apiGet(this.apiResource)
  }

  // perform a post to the flower API
  apiPost(data: JSON) {
    // clear cached post response first
    this.currentPostResponse = null;
    // for animations
    this.postState = 'waiting';
    this.appSvc.apiPost(this.apiResource, data);
  }

  // make a confidence score pretty
  prettyConfidence(score: string) {
    if (score == '1.0')
      return '100'
    else
      return score.slice(2, 4)
  }

  checkForVowel() {
    var letter = this.currentPostResponse.guess1['category'][0]
    return ['a', 'e', 'i', 'o', 'u'].includes(letter)
  }

}
