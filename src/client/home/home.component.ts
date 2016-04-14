declare var user:any;

import {Component, Input} from 'angular2/core';

import {CLALinkComponent} from '../home/clalink/clalink.component';
import {RepoComponent} from '../home/repo/repo.component';

@Component({
    selector: 'home',
    templateUrl:'/client/home/home.html',
    directives: [RepoComponent,CLALinkComponent]
})

export class HomeComponent {
  user = {
    value:{
      login:'Bandana',
      html_url:'https://github.com/duggalbandana',
      avatar_url:'https://avatars.githubusercontent.com/u/18310974?v=3',
      admin:true
    }
  }
}
