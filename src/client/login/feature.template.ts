import {Component, Input} from 'angular2/core';

@Component({
  selector: 'feature',
  templateUrl: '/client/login/feature.html',
})

export class Feature {
  @Input()  public iconsrc: string;
  @Input()  public id: string;
  @Input()  public header: string;
  @Input()  public text: string;
}
