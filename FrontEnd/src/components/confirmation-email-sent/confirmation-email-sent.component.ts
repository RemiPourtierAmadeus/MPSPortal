/**
 * Component ConfirmationEmailSentComponent
 */

import {Component} from 'angular2/core';
import {Output} from "angular2/core";
import {UserComponent} from "../user/user.component";
import {EventEmitter} from "angular2/core";

@Component({
    selector: 'confirmation-email-sent',
    moduleId: module.id,
    templateUrl: './confirmation-email-sent.component.html',
    styleUrls : ['./confirmation-email-sent.component.css']
})
export class ConfirmationEmailSentComponent {

    private user:UserComponent;

    @Output() sendUser= new EventEmitter<UserComponent>();

    constructor(){}

    onSubmit(){
        this.user= new UserComponent("", "", "",
            "", false, false, false,false, "", "",-1, "", 1,
            "Login");
        this.sendUser.emit(this.user);
    }
}