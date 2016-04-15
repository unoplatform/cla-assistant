import {Component, Input} from 'angular2/core';

import {CLALinkComponent} from '../home/clalink/clalink.component';
import {RepoComponent} from '../home/repo/repo.component';

@Component({
    directives: [RepoComponent, CLALinkComponent],
    selector: 'home',
    templateUrl: '/client/home/home.html',
})

export class HomeComponent {
  @Input() public user: JSON;
}
