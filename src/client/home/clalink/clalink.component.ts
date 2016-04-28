// declare var selectedGist: any;
declare var selectedRepo: any;

import {Component, Input} from 'angular2/core';
import {NgModel, NgFor, FORM_DIRECTIVES} from 'angular2/common';
import {DropDownComponent} from '../../utils/dropdown';
import {HomeService} from '../home.service';


@Component({
    directives: [FORM_DIRECTIVES, NgModel, DropDownComponent, NgFor],
    selector: 'cla-link',
    templateUrl: '/client/home/clalink/clalink.html'
})

export class CLALinkComponent {
    @Input() public user: any;
    @Input() public newLink: boolean;
    @Input() public selectedGist: any;
    @Input() public gists$: any;

    public selectedRepo = {
      repo : 'new repo',
    };

    constructor(private homeService: HomeService) {
        this.newLink = false;
        this.selectedGist = {
            gist: {
                name: 'myCLA',
                url: 'http://www.google.com',
            },
        };

        this.getUserGists();
    }

    public isValid( url ) {
      return true;
    };

    public getUserGists() {
      // this.gists$ = this.homeService.getUserGists();
        this.homeService.getUserGists().subscribe((gists) => {
            // console.log(gists);
            this.gists$ = gists;
        });
    }


}
