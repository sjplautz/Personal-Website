import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  animations: [

    trigger('feedbackTrigger', [
      transition(':enter', [
        style({
          'height': 0,
          'opacity': 0
        }),
        animate('1s 1.25s ease-out',
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
export class FeedbackComponent implements OnInit {

  private apiResource: string;
  private payload: any;

  constructor(public appSvc: NeuralNetworkAppService) {
    this.apiResource = "database/nn-app-accuracy";
  }

  ngOnInit(): void {
  }

  handleFeedback(correct: boolean) {
    if (correct) {
      console.log('feedback indicated a correct prediction')
      // this.apiPost("correct");
    }
    else{
      console.log('feedback indicated an incorrect prediction')
      // this.apiPost("incorrect");
    }
  }

  apiPost(result: string) {
    this.payload = {"feedback": result}
    this.appSvc.apiPost(this.apiResource, this.payload)
  }

}
