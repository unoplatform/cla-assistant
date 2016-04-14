import {Component, Input} from 'angular2/core';
import {HomeComponent} from './home/home.component';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'dynamic-view'
})


export class Main {
  @Input() user: Object;

  getUser(){


  }

}
