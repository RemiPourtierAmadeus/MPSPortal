/**
 * Component UserComponent
 * This component defines the structure of a user. This definition comes from the architecture
 * built in the database.
 */

import {Component} from '@angular/core';

@Component({
    selector: 'user',
    moduleId: module.id,
    templateUrl: './user.component.html',
    styleUrls : ['./user.component.css']
})

/**
 * Class User
 */
export class UserComponent {

    /**
     * Constructor
     * @param userId
     * @param fullName
     * @param password
     * @param login : Generated from the full name
     * @param email
     * @param type : Admin, Operational, Developer, Manager
     * @param websitePart : Metrics and/or Performance
     * @param sendReport : Boolean
     * @param emailOptional
     */
    constructor(
        public fullName: string,
        public login: string,
        public email: string,
        public type: string,
        public metrics:boolean,
        public performance:boolean,
        public sendReportY: boolean,
        public sendReportN: boolean,
        public sendReport: string,

        public password?: string, /** When a variable has a ? that means this variable is optional
                                        when we call the constructor**/
        public userId?: number,
        public emailOptional?: string,
        public generatedPwd?: number,
        public error?: string
    ) {  }
}