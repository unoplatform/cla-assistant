import {bootstrap}    from 'angular2/platform/browser';
import {enableProdMode, provide} from 'angular2/core';
import {GithubService} from './utils/github.service';
// import {ApiService} from './utils/api.service';
import {HomeService} from './home/home.service';
import {RootComponent} from './index';

import 'rxjs/Rx';

enableProdMode();

bootstrap(RootComponent, [ GithubService, HomeService, provide(Window, { useValue: window })]);
