import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app.service';
import { HttpService } from 'app/services/shared/http.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  animations: [

    trigger('enterTrigger', [
      transition(':enter', [
        style({height: 0, opacity: 0 }),
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
export class ResultsComponent implements OnInit {
  public postResponses: Observable<any>;
  public getResponses: Observable<any>;
  private subscriptions: Subscription[];

  public postState: string
  public getInitiated: boolean;
  public imageChosen: boolean;
  private apiResource: string;
  private data: any;
  public selectedImage: string;


  constructor(public appSvc: NeuralNetworkAppService, public http: HttpService) { 
    this.postState = 'inactive';
    this.getInitiated = false;
    this.imageChosen = false;
    this.apiResource = "neural-network-app";
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(this.appSvc.ImageChosenEmitter.subscribe(
      data => {
        this.data = {
          "title": "carousel image",
          "url": data.src
        }
        this.selectedImage = data.src; 
        this.imageChosen = true;
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
    this.appSvc.currentGetResponse = null
    this.getResponses = this.http.get(this.apiResource);
    this.subscriptions.push(this.getResponses.subscribe(response => {
      this.getInitiated = true;
      this.appSvc.currentGetResponse = response;
      console.log(response);
    })) 
  }

  // perform a post to the flower API
  apiPost(data: JSON) {
    // clear old post response if any
    this.appSvc.currentPostResponse = null
    // for animations
    this.postState = 'waiting'

    this.postResponses = this.http.post(this.apiResource, data);
    this.subscriptions.push(this.postResponses.subscribe(response => {
      this.appSvc.currentPostResponse = response;
      this.appSvc.currentPostResponse.guess1['confidence'] = this.prettyConfidence(this.appSvc.currentPostResponse.guess1['confidence'])
      this.appSvc.currentPostResponse.guess2['confidence'] = this.prettyConfidence(this.appSvc.currentPostResponse.guess2['confidence'])
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
    var letter = this.appSvc.currentPostResponse.guess1['category'][0]
    return ['a', 'e', 'i', 'o', 'u'].includes(letter)
  }

}
