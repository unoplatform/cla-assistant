import {Component, Input, provide, Inject} from 'angular2/core';
import {LoginComponent}     from './login/login.component';
import {GithubService} from './utils/github.service';

import {NgIf} from 'angular2/common';
import {HomeService} from './home/home.service';
import {HomeComponent} from './home/home.component';

@Component({
    directives: [LoginComponent, HomeComponent, NgIf],
    providers: [
        provide(
            HomeService, {
                deps: [GithubService]
            }),
    ],
    selector: 'mainroot',
    template: `<login *ngIf="login"></login>
               <home  *ngIf="home" [user]="user"></home>`,
})

export class RootComponent {
    // parameters that control visibility of home and the login component
    // observable$: Observable<any>;
    @Input() public login: boolean;
    @Input() public home: boolean;
    @Input() public user: any;

    constructor(@Inject(HomeService) homeService ) {
      let that = this;
      homeService.getUser().subscribe(
          (user) => {
              that.user = user;
              that.login = false;
              that.home = true;
          },
          (error) => {
              that.login = true;
              that.home = false;
          }
      );
    //   this.observable$ = new Observable(observer => observer.next('click'));
      // let gists$ = homeService.getUserGists();
      // gists$.subscribe((gists) => {
      //     console.log(gists);
      // });
    }
}
