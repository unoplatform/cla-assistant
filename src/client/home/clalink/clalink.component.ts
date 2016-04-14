declare var selectedGist: any;
declare var selectedRepo: any;

import {Component, Input} from 'angular2/core';

@Component({
    selector: 'cla-link',
    templateUrl: '/client/home/clalink/clalink.html'
})

export class CLALinkComponent {
    @Input() user: any;
    @Input() newLink: boolean;

    selectedGist = {
        gist: {
            name: 'myCLA',
            url: 'http://www.google.com'
        }
    }

    selectedRepo = {
      repo : "new repo"
    }

    constructor() {
        this.newLink = false;
    }

    isValid(url){
      return true;
    }


}
