declare var claRepos:any;
declare var repo:any;

import {Component, Input} from 'angular2/core';
import {CLARepoRow} from './row.template';
import {ContributorsModal} from './contributors.modal';

@Component({
    selector: 'linked-repositories',
    templateUrl:'/client/home/repo/repo.html',
    directives:[CLARepoRow,ContributorsModal]
})

export class RepoComponent{
  @Input() user;
  @Input() claRepos;

  repo = {
    gist:"https://hello/gist",
    repo:"repo1",
    owner:"Bandana"
  }

  constructor(){
    this.claRepos = [];
    this.claRepos.push(this.repo);
  }
  getGistName(){
    return 'test gist';
  }

}
