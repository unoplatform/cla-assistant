import {Directive, ElementRef, AfterViewInit} from 'angular2/core';

@Directive({
    selector: '[activate-tooltip]'
})

export class TooltipActivation implements AfterViewInit {

    element: any;

    constructor(el: ElementRef) {
        this.element = $(el.nativeElement);
    }

    ngAfterViewInit() {
        this.element.tooltip();
    }

}
