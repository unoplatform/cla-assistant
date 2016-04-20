import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';

@Component({
  directives: [NgClass],
  selector: 'feature',
  templateUrl: '/client/login/feature.html',
})

export class Feature {
  @Input()  public iconsrc: string;
  @Input()  public id: string;
  @Input()  public header: string;
  @Input()  public text: string;
}
