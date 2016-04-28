import {HTTP_PROVIDERS} from 'angular2/http';
import {Component, provide, Input} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {GithubService} from '../utils/github.service';
import {HomeService} from './home.service';
import {HomeComponent} from './home.component';
import 'rxjs/Rx';

// impoer Angular2 testing library instead of pure jasmine fuctions
import {it, describe, expect, TestComponentBuilder, injectAsync, beforeEachProviders} from 'angular2/testing';

export function main() {
    describe('A suite', () => {


        beforeEachProviders(() => {
            return [
                HTTP_PROVIDERS,
                provide(Window, { useValue: window }),
                GithubService,
                HomeService
            ];
        });

        it('should greet the logged in user', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                return tcb.createAsync(TestComponent)
                    .then(rootTC => {
                        rootTC.detectChanges();
                        let appDOMEl = rootTC.debugElement.nativeElement;
                        let text = (DOM.querySelector(appDOMEl, '.navbar-text-hide').textContent).trim();
                        expect(text).toEqual('Hey, UserName!');
                    });
            }));
    });
}

@Component({
    directives: [HomeComponent],
    selector: 'test-cmp',
    template: '<home [user]="user"></home>'
})
class TestComponent {
    @Input() public user: any;

    constructor() {
        this.user = {
            avtar_url: 'http://avtarurl.com',
            html_url: 'http://htmlurl.com',
            login: 'UserName'
        };
    };


}
