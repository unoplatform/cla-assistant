import {Component, Input} from 'angular2/core';

@Component({
  selector: 'feature',
  templateUrl:'/client/login/feature.html'
})

export class feature {
  @Input()  iconsrc:string;
  @Input()  id:string;
  @Input()  header:string;
  @Input()  text:string;
}
