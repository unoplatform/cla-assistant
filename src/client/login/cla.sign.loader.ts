import {Directive} from 'angular2/core';

declare var AdobeEdge:any;

@Directive({
  selector: '[load]'
})
export class load {

  constructor() {
    AdobeEdge.loadComposition('assets/js/CLA_signature_MouseOver', 'EDGE-110781156', {
              scaleToFit: "none",
              centerStage: "none",
              minW: "0",
              maxW: "undefined",
              width: "550px",
              height: "400px"
          }, {
              dom: []
          }, {
              dom: []
          });
  }

}
