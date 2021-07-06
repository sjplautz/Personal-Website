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
export class FeedbackComponent implements OnInit {

  constructor(public appSvc: NeuralNetworkAppService) { }

  ngOnInit(): void {
  }

}
