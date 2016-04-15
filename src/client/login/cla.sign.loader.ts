import {ElementRef, Directive} from 'angular2/core';

declare var AdobeEdge: any;

@Directive({
    selector: '[load]',
})
export class Load {

    constructor(el: ElementRef) {
      AdobeEdge.loadComposition(
          'assets/js/CLA_signature_MouseOver',
          'EDGE-110781156',
          {
              centerStage: 'none',
              height: '400px',
              maxW: 'undefined',
              minW: '0',
              scaleToFit: 'none',
              width: '550px',
          },
          {
              dom: [],
          },
          {
              dom: [],
          });
    }

}
