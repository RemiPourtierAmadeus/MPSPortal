/**
 * Component AddUserComponent
 */

import {Component} from 'angular2/core';
import {UserComponent} from "../user/user.component";

@Component({
    selector: 'add-user',
    moduleId: module.id,
    templateUrl: './add-user.component.html',
    styleUrls : ['./add-user.component.css']
})

/**
 * Class AddUser
 */
export class AddUserComponent {

    public userTypesValues;
    public websitePartsValues;
    public reportsValues;
    public submitted;
    public user;

    constructor(){
        this.submitted = false;
        this.userTypesValues = ["Admin","Operational","Developer","Manager"];
        this.websitePartsValues = ["Metrics","Performance"]; //TODO: TO use !
        this.reportsValues = ["Yes","No"]; //TODO: TO use !
        this.user= new UserComponent("", "", "",
            "", [""], true);
    }

    onSubmit(){
        this.submitted=true;
    }

}