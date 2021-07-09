import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightChangedItem]'
})
export class HighlightChangedItemDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() { }

  @HostListener('change') onchange(eventData: Event) {
    console.log("tested change event success")
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

}
