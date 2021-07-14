import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollToId]'
})
export class ScrollToIdDirective implements OnInit {

  constructor(private elRef: ElementRef) {
  }

  ngOnInit(): void {
    setTimeout(() => {this.elRef.nativeElement.scrollIntoView({behavior: "smooth"});}, 300);
  }

}
