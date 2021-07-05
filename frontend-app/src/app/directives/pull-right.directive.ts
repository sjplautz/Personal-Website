import { Directive, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appPullRight]'
})
export class PullRightDirective implements OnInit{
  @HostBinding('class.pull-right') pullRight = false;

  constructor() { }

  ngOnInit(){
    this.pullRight = true;
  }
}
