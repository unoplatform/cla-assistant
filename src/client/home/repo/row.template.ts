declare var gist: any;
declare var signatures: any;

export interface IRepo {
    repo: string;
    owner: string;
}

import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {TooltipActivation} from '../../utils/activate_tooltip';
import {NgClass, NgIf, DatePipe} from 'angular2/common';


@Component({
    directives: [TooltipActivation, NgClass, NgIf],
    pipes: [DatePipe],
    selector: 'cla-repo-row',
    templateUrl: '/client/home/repo/row.template.html'
})

export class CLARepoRow {
    @Input() public repo;
    @Output() public showContributors = new EventEmitter<IRepo>();

    public updatedDate = new Date('2016-03-19T01:09:25Z');
    public gistName: string;

    public gist = {
        html_url: 'https://gistUrl',
        id: [0, 1, 2],
        updated_at: this.updatedDate,
    };

    public signatures = {
        value: [
            '123', '456',
        ],
    };

    public isLinkActive() {
        return true;
    }

    public getGistName() {
        this.gistName = 'MyGist';
        // return 'MyGist';
    }

    public showContributorsReport() {
        console.log('test');
        this.showContributors.next(this.repo);
    }

}
