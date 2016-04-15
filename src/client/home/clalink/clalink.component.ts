declare var selectedGist: any;
declare var selectedRepo: any;

import {Component, Input} from 'angular2/core';

@Component({
    selector: 'cla-link',
    templateUrl: '/client/home/clalink/clalink.html',
})

export class CLALinkComponent {
    @Input() public user: any;
    @Input() public newLink: boolean;

    public selectedGist = {
        gist: {
            name: 'myCLA',
            url: 'http://www.google.com',
        },
    };

    public selectedRepo = {
      repo : 'new repo',
    };

    constructor( ) {
        this.newLink = false;
    }

    public isValid( url ) {
      return true;
    };


}
