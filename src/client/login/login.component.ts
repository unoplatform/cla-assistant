import {Component, Input} from 'angular2/core';
import {Feature} from './feature.template';
import {Load} from './cla.sign.loader';

@Component({
    directives: [Feature, Load],
    selector: 'login',
    templateUrl: '/client/login/login.html',
})


export class LoginComponent {
    @Input() public active: number;

    // text slider
    public numberRepos: number;
    public numberClas: number;
    public numberStars: number;
    public time = '5000';

    private _window: Window;

    constructor(private window: Window) {
        this._window = window;

        this.active = 0;
        this._updateNumberOfRepos();
        this._updateNumberOfCLAs();
        this._updateNumberOfStars();
        this._TiggerSlider();
    }

    public logAdminIn() {
        this._window.location.href = '/auth/github?admin=true';
    }

    private _updateNumberOfRepos() {
        this.numberRepos = 10;
    }

    private _updateNumberOfCLAs() {
        this.numberClas = 1;
    }

    private _updateNumberOfStars() {
        this.numberStars = 5;
    }

    private _TiggerSlider() {
        setTimeout(
            (time) => {
                this.active = +this.active + 1 === 3 ? 0 : +this.active + 1;
                this._TiggerSlider();
            },
            this.time);
    }

}
