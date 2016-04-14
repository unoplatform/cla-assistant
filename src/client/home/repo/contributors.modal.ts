
declare var contributors: any;
declare var contributor: any;

import {Component, ElementRef, Input} from 'angular2/core';

@Component({
    selector: 'contributors-modal',
    templateUrl: '/client/home/repo/contributors.modal.html'
})


export class ContributorsModal {
    @Input() gistName: string;
    @Input() repo: any;
    @Input() contributors: any;

    reverse: boolean;
    column: string;
    loading: boolean;

    updatedDate = new Date('2016-03-19T01:09:25Z');

    element: any;

    contributor = {
        user_name: 'Alpha-Beta',
        signed_at: this.updatedDate
    };

    constructor(el: ElementRef) {
        this.element = $(el.nativeElement);
        this.contributors = [];
        this.contributors.push(this.contributor);
        this.reverse = false;
        this.column = 'user_name';
        this.loading = false;
    }

    showContributors(repo) {
        this.repo = repo;
        this.element.modal('show');
    }

    cancel() {
        this.element.modal('hide');
    }


}
