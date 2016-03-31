/**
 * Component UserComponent
 */

import {Component} from 'angular2/core';

@Component({
    selector: 'user',
    moduleId: module.id,
    templateUrl: './user.component.html',
    styleUrls : ['./user.component.css']
})
export class UserComponent {
    constructor(
        public userId: number,
        public fullName: string,
        public password: string,
        public login: string,
        public email: string,
        public type: string,
        public websitePart: string,
        public sendReport: boolean,
        public emailOptional?: string
    ) {  }
}