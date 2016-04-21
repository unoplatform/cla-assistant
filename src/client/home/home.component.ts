import {Component, Input} from 'angular2/core';

import {CLALinkComponent} from '../home/clalink/clalink.component';
import {RepoComponent} from '../home/repo/repo.component';
import {TooltipActivation} from '../utils/activate_tooltip';

@Component({
    directives: [RepoComponent, CLALinkComponent,TooltipActivation],
    selector: 'home',
    templateUrl: '/client/home/home.html',
})

export class HomeComponent {
  @Input() public user: JSON;
}
