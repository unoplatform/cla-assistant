declare var user: any;

import {Component} from 'angular2/core';

import {CLALinkComponent} from '../home/clalink/clalink.component';
import {RepoComponent} from '../home/repo/repo.component';

@Component({
    directives: [RepoComponent, CLALinkComponent],
    selector: 'home',
    templateUrl: '/client/home/home.html',
})

export class HomeComponent {
    public user = {
        value: {
            admin: true,
            avatar_url: 'https://avatars.githubusercontent.com/u/18310974?v=3',
            html_url: 'https://github.com/duggalbandana',
            login: 'Bandana',
        },
    };
}
