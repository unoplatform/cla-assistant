import {LoginComponent} from './login.component';
import {Component, provide} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {HomeService} from '../home/home.service';
import {GithubService} from '../utils/github.service';
import {HTTP_PROVIDERS} from 'angular2/http';

import 'rxjs/Rx';

// impoer Angular2 testing library instead of pure jasmine fuctions
import {it, describe, expect, TestComponentBuilder, injectAsync, beforeEachProviders}from 'angular2/testing';

export function main() {
    describe('A suite', () => {
        beforeEachProviders(() => [
            HTTP_PROVIDERS,
            HomeService,
            GithubService,
            provide(Window, { useValue: window })
        ]);

        it('should invoke auth backend service with admin=true', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            return tcb.createAsync(TestComponent)
                .then(rootTC => {
                    rootTC.detectChanges();
                    let appDOMEl = rootTC.debugElement.nativeElement;
                    let upperDOM = DOM.querySelectorAll(appDOMEl, 'div > login > div > div')[1];
                    expect(DOM.querySelectorAll(upperDOM, 'div > div > a')[1].href)
                        .toMatch(/http:\/\/localhost:\d+\/auth\/github\?admin=true/);
                });
        }));
    });
}

@Component({
    directives: [LoginComponent],
    selector: 'test-cmp',
    template: '<login></login>'
})
class TestComponent { }
