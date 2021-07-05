import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  
  onMenuClick(){
    console.log('clicked');
  }

}
