declare var gist:any;
declare var signatures:any;

export interface Repo {
  repo: string,
  owner: string
}


import {Component, Input,Output,EventEmitter} from 'angular2/core';
import {TooltipActivation} from '../../utils/activate_tooltip';

// import {TOOLTIP_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'cla-repo-row',
    templateUrl:'/client/home/repo/row.template.html',
    directives:[TooltipActivation]
    // directives:[TOOLTIP_DIRECTIVES]
})

export class CLARepoRow{
  @Input() repo;
  @Output() showContributors = new EventEmitter<Repo>();

updatedDate = new Date('2016-03-19T01:09:25Z');

  gistName:string;

  gist = {
    html_url:"https://gistUrl",
    id:[  0,1,2],
    updated_at: this.updatedDate
  };

signatures={
  value:[
    '123','456'
  ]
}
  isLinkActive() {
    return true;
  }

  getGistName(){
    this.gistName = 'MyGist';
    // return 'MyGist';
  }

  showContributorsReport(){
    console.log('test');
    this.showContributors.next(this.repo);
  }

}
