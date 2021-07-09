import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { NeuralNetworkAppService } from 'app/services/apps/neural-network-app/neural-network-app.service';

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
        animate('850ms 1s ease-out',
          style({ opacity: 1 })
        )
      ])
    ]),
  ],
})

export class FeedbackComponent implements OnInit {

  constructor(public appSvc: NeuralNetworkAppService) {}

  ngOnInit(): void {}

  handleFeedback(correct: boolean) {
    if (correct) {
      console.log('feedback indicated a correct prediction')
      this.appSvc.onFeedbackSubmitted("correct");
    }
    else{
      console.log('feedback indicated an incorrect prediction')
      this.appSvc.onFeedbackSubmitted("incorrect");
    }
  }

}