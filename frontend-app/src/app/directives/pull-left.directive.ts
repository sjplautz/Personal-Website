import { Directive, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appPullLeft]'
})
export class PullLeftDirective implements OnInit{
  @HostBinding('class.pull-left') pullLeft: boolean = false;

  constructor() { }
  
  ngOnInit(){
    this.pullLeft = true;
  }

}
