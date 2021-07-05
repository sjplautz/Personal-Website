import { Component, OnInit } from '@angular/core';
import { ContactMe } from './contact-me.model';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  contactMe: ContactMe

  constructor() { 
    this.contactMe = new ContactMe()
  }

  ngOnInit(): void {
  }

}
