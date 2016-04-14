import {Component, Input} from 'angular2/core';
import {feature} from './feature.template';
import {load} from './cla.sign.loader';

@Component({
    selector: 'login',
    templateUrl: '/client/login/login.html',
    directives: [feature,load]
})


export class LoginComponent {
    @Input() active: number;

// text slider
    numberRepos: number;
    numberClas: number;
    numberStars: number;
    time = '5000';

    constructor() {
        this.active = 0;
        this._updateNumberOfRepos();
        this._updateNumberOfCLAs();
        this._updateNumberOfStars();
        this._TiggerSlider();
    }

    logAdminIn() {
        console.log("Sign In Selected");
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
        setTimeout((time) => {
            this.active = +this.active + 1 === 3 ? 0 : +this.active + 1;
            this._TiggerSlider();
        }, this.time);
    }

}
