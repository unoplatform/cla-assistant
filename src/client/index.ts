import {Component, Input} from 'angular2/core';
import {LoginComponent}     from './login/login.component';
import {HomeComponent} from './home/home.component';
import {NgIf} from 'angular2/common';
import {HomeService} from './home/home.service';
// import {Observable} from 'rxjs/Observable';

@Component({
    directives: [LoginComponent, HomeComponent, NgIf],
    // providers: [HomeService],
    selector: 'mainroot',
    template: `<login *ngIf="login"></login>
               <home  *ngIf="home" [user]="user"></home>`
})

export class RootComponent {
    // parameters that control visibility of home and the login component
    // observable$: Observable<any>;
    @Input() public login: boolean;
    @Input() public home: boolean;
    @Input() public user: any;

    constructor(public homeService: HomeService ) {
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
      let gists$ = homeService.getUserGists();
      gists$.subscribe((gists) => {
          console.log(gists);
      });
    }
}
