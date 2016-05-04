// declare var selectedGist: any;
declare var selectedRepo: any;

import {Component, Input, provide} from 'angular2/core';
import {NgModel, NgFor, FORM_DIRECTIVES} from 'angular2/common';
import {HomeService} from '../home.service';
import {ClaLinkService} from './clalink.service';
import {ApiService} from '../../utils/api.service';
import {GithubService} from '../../utils/github.service';


@Component({
    directives: [FORM_DIRECTIVES, NgModel, NgFor],
    providers: [
        provide(
            ClaLinkService, {
                deps: [ApiService]
            }),
        provide(
            HomeService, {
                deps: [GithubService]
            })
    ],
    selector: 'cla-link',
    templateUrl: '/client/home/clalink/clalink.html'
})

export class ClaLinkComponent {
    @Input() public user: any;
    @Input() public newLink: boolean;
    @Input() public selectedGist: any;
    @Input() public selectedRepo: any;
    @Input() public gists: any;
    @Input() public repos: any;


    constructor(private homeService: HomeService, private claLinkService: ClaLinkService) {
        this.newLink = false;
        this.selectedGist = { gist: {} };
        this.selectedRepo = {
            repos: [],
            repo: {}
        };
        this.getUserGists();
        this.getUserRepos();
    }

    public isValid(url) {
        return true;
    };

    public getUserGists() {
        this.homeService.getUserGists().subscribe((gists) => {
            this.gists = gists;
        });
    }

    public link(repos, gist) {
        this.claLinkService.linkRepos(repos, gist);
    }

    public onGistSelected(event) {
        // todo: check if the entire gist object can be set in the value of "options"
        this.selectedGist.gist.url = event.target.value;
        this.selectedGist.gist = this.gists.find(gist => gist.url === this.selectedGist.gist.url);
    }

    public getUserRepos() {
        this.homeService.getUserRepos().subscribe((repos) => {
            this.repos = repos;
        });
    }

    public onRepoSelected(event) {
        this.selectedRepo.repo.id = event.target.value;
        this.selectedRepo.repos = [];
        this.selectedRepo.repos.push(this.repos.find(repo => repo.id === +this.selectedRepo.repo.id));
    }

}
