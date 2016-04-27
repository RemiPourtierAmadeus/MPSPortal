/**
 * Component ChangePwdComponent
 */

import {Component} from 'angular2/core';
import {ManageUsersService} from "../../shared/services/src/manage-users.service";
import {UserComponent} from "../user/user.component";
import {VerificationPwdComponent} from "../verification-pwd/verification-pwd.component";

@Component({
    selector: 'change-pwd',
    moduleId: module.id,
    templateUrl: './change-pwd.component.html',
    controller: VerificationPwdComponent,
    controllerAs: "passwordVerification",
    styleUrls : ['./change-pwd.component.css']
})

export class ChangePwdComponent {

    public user;

    constructor(private _manageUserService:ManageUsersService) {
        this.user = new UserComponent("", "", "",
            "", false, false, false,false, "", "");
    }
}