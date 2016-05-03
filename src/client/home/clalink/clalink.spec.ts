/// <reference path="../../../../typings/main/ambient/sinon/index.d.ts" />

import {provide} from 'angular2/core';
import {ClaLinkService} from './clalink.service';
import {ApiService} from '../../utils/api.service';
import * as Sinon from 'sinon';
import {inject, it, describe, expect, TestComponentBuilder, injectAsync, beforeEachProviders, beforeEach} from 'angular2/testing';

export function main() {
    describe('ClaLinkComponent', () => {
        let claLinkService;
        beforeEachProviders(() => [
            // provide(ClaLinkService, { useClass: MockClaLinkService }),
            provide(Window, { useValue: window }),
            ApiService,
            ClaLinkService,
        ]);
        beforeEach(inject([ClaLinkService], (_claLinkService) => {
            claLinkService = _claLinkService;
        }));

        it('should greet the logged in user', () => {
            Sinon.stub(claLinkService, 'linkRepos', (repos, gist) => {
                console.log('YEAH!');
            } );
        });
    });
}


// class MockClaLinkService extends ClaLinkService {

// private _mockServiceReturnValue: any;
// private _calledObj: string;
// private _calledFun: string;
// private _calledArgs: JSON;


//   constructor() {
//     super(null);
//   }

//   public call(obj: string, fun: string, args: JSON) {
//     this._calledObj = obj;
//     this._calledFun = fun;
//     this._calledArgs = args;

//     return Observable.of(this._mockServiceReturnValue);
//   }

//   public setMockServiceReturnValue(value) {
//     this._mockServiceReturnValue = value;
//   }

//   public getCalledObj() {
//     return this._calledObj;
//   }

//   public getCalledArgs() {
//     return this._calledArgs;
//   }

//   public getCalledFun() {
//     return this._calledFun;
//   }

// }


// class MockHomeService extends HomeService {

//   constructor() {
//     super(new MockGithubService());
//   }

//     public getUser() {
//       return Observable.of({});
//     }

//     public getUserGists() {
//       return Observable.of([]);
//     }

// }
