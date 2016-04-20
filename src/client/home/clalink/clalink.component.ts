// declare var selectedGist: any;
declare var selectedRepo: any;

import {Component, Input} from 'angular2/core';
import {NgModel, FORM_DIRECTIVES} from 'angular2/common';

@Component({
    directives: [FORM_DIRECTIVES, NgModel],
    selector: 'cla-link',
    templateUrl: '/client/home/clalink/clalink.html'
})

export class CLALinkComponent {
    @Input() public user: any;
    @Input() public newLink: boolean;
    @Input() public selectedGist: any;

    public selectedRepo = {
      repo : 'new repo',
    };

    constructor( ) {
        this.newLink = false;
        this.selectedGist = {
            gist: {
                name: 'myCLA',
                url: 'http://www.google.com',
            },
        };
    }

    public isValid( url ) {
      return true;
    };


}
