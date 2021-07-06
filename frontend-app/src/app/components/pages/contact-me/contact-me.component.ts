import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { ContactMe } from './contact-me.model';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  contactMe: ContactMe

  constructor(private clipboard: Clipboard) { 
    this.contactMe = new ContactMe()
  }

  ngOnInit(): void {
  }

  handleCopy() {
    this.clipboard.copy('plautzstephen@gmail.com');
  }

}
