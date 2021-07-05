import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appSendContent]'
})
export class SendContent implements OnInit {

    // use this directive to attach to img element and sent the element to the service
    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        let activeSvc = "";
        // activeSvc.setRef(this.elementRef);
    }

}