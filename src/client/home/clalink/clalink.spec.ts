/// <reference path="../../../../typings/main/ambient/sinon/index.d.ts" />

import {provide} from 'angular2/core';
import {ClaLinkComponent} from './clalink.component';
import {ClaLinkService} from './clalink.service';
import {GithubService} from './../../utils/github.service';
import {HomeService} from '../home.service';
import * as Sinon from 'sinon';
import {TestUtil} from '../../uiTest.service';
import {it, describe, expect, TestComponentBuilder, ComponentFixture, injectAsync, inject, beforeEachProviders, beforeEach} from 'angular2/testing';


export function main() {
    describe('ClaLinkComponent', () => {
        let claLinkService;
        let claLinkComponent;
        let homeService;
        let testUtil;

        beforeEachProviders(() => [
            provide(Window, { useValue: window }),
            HomeService,
            GithubService,
        ]);

        beforeEach(inject([GithubService], (githubService) => {
            testUtil = new TestUtil();
            Sinon.stub(githubService, 'call', (o, f, a) => {
                return testUtil.getObservable(null);
            });

            claLinkService = new ClaLinkService(null);
            homeService = new HomeService(githubService);

            Sinon.stub(homeService, 'getUserGists', () => {
                return testUtil.getObservable('');
            });
            Sinon.stub(homeService, 'getUserRepos', () => {
                return testUtil.getObservable('');
            });

            Sinon.stub(claLinkService, 'linkRepos', (repos, gist) => {
                console.log('YEAH!');
            });

        }));
        beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
            tcb.overrideProviders(ClaLinkComponent, [
                                                      provide(HomeService, { useValue: homeService} ),
                                                      provide(ClaLinkService, { useValue : claLinkService} )
                                                    ])
              .createAsync(ClaLinkComponent)
              .then((fixture) => {
                claLinkComponent = fixture.componentInstance;
            });
        }));

        it('should greet the logged in user', () => {
            claLinkComponent.link(null, null);
            expect(claLinkService.linkRepos.called).toBe(true);
        });
    });
}
