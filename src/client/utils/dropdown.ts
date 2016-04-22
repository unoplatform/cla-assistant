import {Component, Input, ElementRef, AfterViewInit} from 'angular2/core';
import {NgModel, FORM_DIRECTIVES} from 'angular2/common';

@Component({
    directives: [FORM_DIRECTIVES, NgModel],
    selector: 'dropdown',
    templateUrl: '/client/utils/dropdown.html'
})

export class DropDownComponent {
    @Input() public gist: string;
    public states: Array<string>;
    public allStates:Array<string>;

    private element: any;

    // constructor(el: ElementRef) {
    //     this.element = $(el.nativeElement);
    //     this.element = this.element.find('.typeahead');
    //     this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    //         'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    //         'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    //         'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    //         'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    //         'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    //         'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    //         'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    //         'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    //     ];
    // }
    //
    // public ngAfterViewInit() {
    //
    //     let that = this;
    //     this.element.typeahead({
    //         hint: true,
    //         minLength: 0,
    //         limit:3
    //     },
    //         {
    //             name: 'states',
    //             source: that.substringMatcher(that.states)
    //         });
    //
    // }
    //
    // public substringMatcher(strs) {
    //     return function findMatches(q, cb) {
    //         let matches: Array<string>;
    //         // let substrRegex: any;
    //
    //         // an array that will be populated with substring matches
    //         matches = [];
    //
    //         // regex used to determine if a string contains the substring `q`
    //         // substrRegex = new RegExp(q, 'i');
    //
    //         // iterate through the pool of strings and for any string that
    //         // contains the substring `q`, add it to the `matches` array
    //         for(let str of strs){
    //           if(str.indexOf(q) > -1){
    //             matches.push(str);
    //           }
    //         }
    //
    //         cb(matches);
    //     };
    // };
    //
    // public showAll(){
    //   this.element.typeahead('open');
    // }

}
