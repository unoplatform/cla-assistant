declare var claRepos: any;
declare var repo: any;

import {Component, Input} from 'angular2/core';
import {CLARepoRow} from './row.template';
import {ContributorsModal} from './contributors.modal';
import {NgFor, NgIf} from 'angular2/common';

@Component({
    directives: [CLARepoRow, ContributorsModal, NgFor, NgIf],
    selector: 'linked-repositories',
    templateUrl: '/client/home/repo/repo.html',
})

export class RepoComponent {
    @Input() public user;
    @Input() public claRepos;

    public repo = {
        gist: 'https://hello/gist',
        owner: 'Bandana',
        repo: 'repo1',
    };

    constructor() {
        this.claRepos = [];
        this.claRepos.push(this.repo);
    }

    public getGistName() {
        return 'test gist';
    }

}
