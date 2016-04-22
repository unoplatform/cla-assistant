
import {Directive, ElementRef, AfterViewInit} from 'angular2/core';

@Directive({
    selector: '[activate-tooltip]',
})

export class TooltipActivation implements AfterViewInit {

    private element: any;

    constructor(el: ElementRef) {
        this.element = $(el.nativeElement);
    }

    public ngAfterViewInit() {
        this.element.tooltip();
    }

}
