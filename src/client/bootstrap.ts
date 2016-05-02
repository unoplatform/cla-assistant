import {bootstrap}    from 'angular2/platform/browser';
import {enableProdMode, provide} from 'angular2/core';
import {GithubService} from './utils/github.service';
import {ApiService} from './utils/api.service';
import {HomeService} from './home/home.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RootComponent} from './index';

import 'rxjs/Rx';

enableProdMode();

bootstrap(RootComponent, [HTTP_PROVIDERS, GithubService, ApiService, HomeService, provide(Window, { useValue: window })]);
