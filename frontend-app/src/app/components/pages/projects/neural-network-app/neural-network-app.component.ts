import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app.service';
import { HttpService } from 'app/services/shared/http.service';

@Component({
  selector: 'app-neural-network-app',
  templateUrl: './neural-network-app.component.html',
  styleUrls: ['./neural-network-app.component.scss'],
  providers: [NeuralNetworkAppService],
  animations: [

    trigger('enterTrigger', [
      transition(':enter', [
        style({height: 0, opacity: 0 }),
        animate('500ms ease-out', 
                style({ opacity: 1 })
        )
      ])
    ]),

    trigger('enterLeaveTrigger', [
      transition(':enter', [
          style({height: 0, opacity: 0 }),
          animate('1s ease-out', 
                  style({ opacity: 1 })
          )
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1s ease-in', 
                style({ height: 0, opacity: 0 })
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

    trigger('feedbackTrigger', [
      transition(':enter', [
          style({
            'height': 0, 
            'opacity': 0 
          }),
          animate('1s 1.5s ease-out', 
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
export class NeuralNetworkAppComponent implements OnInit, OnDestroy {
  public postResponses: Observable<any>;
  public getResponses: Observable<any>;
  private subscriptions: Subscription[];

  public currentGetResponse: any;
  public currentPostResponse: any;
  public postState: string
  public imageChosen: boolean;
  public getInitiated: boolean;
  private apiResource: string;
  private data: any;
  public selectedImage: string;

  constructor(private appSvc: NeuralNetworkAppService, private http: HttpService) { 
    this.imageChosen = false;
    this.postState = 'inactive';
    this.getInitiated = false;
    this.apiResource = "neural-network-app";
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(this.appSvc.ImageChosenEmitter.subscribe(
      data => {
        this.imageChosen = true;
        this.data = {
          "title": "carousel image",
          "url": data.src
        }
        this.selectedImage = data.src; 
        this.apiPost(this.data);
      }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => {
      if(subscription !== undefined){
        subscription.unsubscribe()
      }
    }) 
  }

  // perform a get request to the flower API
  apiGet() {
    // clear old get response if any
    this.currentGetResponse = null
    this.getResponses = this.http.get(this.apiResource);
    this.subscriptions.push(this.getResponses.subscribe(response => {
      this.getInitiated = true;
      this.currentGetResponse = response;
      console.log(response);
    })) 
  }

  // perform a post to the flower API
  apiPost(data: JSON) {
    // clear old post response if any
    this.currentPostResponse = null
    // for animations
    this.postState = 'waiting'

    this.postResponses = this.http.post(this.apiResource, data);
    this.subscriptions.push(this.postResponses.subscribe(response => {
      this.currentPostResponse = response;
      this.currentPostResponse.guess1['confidence'] = this.prettyConfidence(this.currentPostResponse.guess1['confidence'])
      this.currentPostResponse.guess2['confidence'] = this.prettyConfidence(this.currentPostResponse.guess2['confidence'])
      console.log("http post response: ", response);
      this.postState = 'finished'
    })) 
    
  }

  // make a confidence score pretty
  prettyConfidence(score: string){
    if(score == '1.0')
      return '100'
    else
      return score.slice(2, 4)
  }

  checkForVowel(){
    var letter = this.currentPostResponse.guess1['category'][0]
    return ['a', 'e', 'i', 'o', 'u'].includes(letter)
  }

}