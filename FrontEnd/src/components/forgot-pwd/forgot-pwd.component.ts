/**
 * Component ForgotPwdComponent
 */

import {Component, EventEmitter, Output} from 'angular2/core';
import {UserComponent} from "../user/user.component";
import {ManageUsersService} from "../../shared/services/src/manage-users.service";

@Component({
    selector: 'forgot-pwd',
    moduleId: module.id,
    templateUrl: './forgot-pwd.component.html',
    styleUrls : ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent {

    public user:UserComponent;

    @Output() sendUser= new EventEmitter<UserComponent>();

    constructor(private _manageUserService:ManageUsersService) {
        this.user = new UserComponent("", "", "",
            "", false, false, false, false, "","");
    }

    backToConnection(){
        this.user= new UserComponent("", "", "",
            "", false, false, false,false, "", "",-1, "", 1,
            "Login");
        this.sendUser.emit(this.user);
    }

}