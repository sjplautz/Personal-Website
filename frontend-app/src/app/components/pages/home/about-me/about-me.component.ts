import { Component, OnInit } from '@angular/core';
import { AboutMe } from './about-me.model';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  aboutMe = new AboutMe();

  constructor() { }

  ngOnInit(): void {
  }

}
