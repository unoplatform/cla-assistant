/// <reference path="../../../../typings/main/ambient/sinon/index.d.ts" />

import {provide} from 'angular2/core';
import {ApiService} from '../../utils/api.service';
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
            ApiService,
            ClaLinkService,
            HomeService,
            GithubService,
        ]);

        beforeEach(inject([HomeService], (_homeService: HomeService) => {
            homeService = _homeService;
            testUtil = new TestUtil();
            Sinon.stub(homeService, 'getUserGists', () => {
                return testUtil.getObservable('');
            });
            Sinon.stub(homeService, 'getUserRepos', () => {
                return testUtil.getObservable('');
            });

        }));
        beforeEach(inject([ClaLinkService, TestComponentBuilder], (_claLinkService: ClaLinkService, tcb: TestComponentBuilder) => {
            claLinkService = _claLinkService;
            let promise = tcb
                .overrideProviders(ClaLinkComponent, [provide(HomeService, {useValue: homeService})])
                .createAsync(ClaLinkComponent);
            promise.then((fixture) => {
                claLinkComponent = fixture.componentInstance;
            });
        }));

        it('should greet the logged in user', () => {
            Sinon.stub(claLinkService, 'linkRepos', (repos, gist) => {
                console.log('YEAH!');
            });

            // claLinkComponent.link(null, null);
            // expect(claLinkService.linkRepos.called).toBe(true);
        });
    });
}
