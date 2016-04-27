/**
 * Component ChangePwdComponent
 */

import {Component, EventEmitter, Output,Input} from 'angular2/core';
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


    public errorFromServer;
    public user;

    @Input('user-generated') generatedPwd:number;
    @Input('user-id') userId:number;
    @Output() sendErrorMessage= new EventEmitter<string>();

    constructor(private _manageUserService:ManageUsersService) {}

    ngOnInit(){
        console.log("user id: "+ this.userId);
        console.log("generatedPwd: "+ this.generatedPwd);
        this.user=new UserComponent("", "", "",
            "", false, false, false,false, "", "",this.userId, "",  this.generatedPwd,
            "");
    }

    /**
     * Function buildUserJSON.
     * The function builds the JSON from the user information filled in the form.
     * @returns JSON
     */
    buildUserJSON() {
        let userJSON = {
            password: this.user.password,
            login: this.user.login
        };
        console.log("user json: "+userJSON["password"]);
        return userJSON;
    }

    /**
     * Function onSubmit.
     * The function is called when user click on the submit button in the form. Then,
     * we build a JSON from data given by user (couple login/password) and then we send the data to the server.
     */
    onSubmit() {
        let finalUserJSON = this.buildUserJSON();
        this._manageUserService.connect(finalUserJSON).then(
            user => 1, //this.user=user,
            error => this.errorFromServer = <any> error);
    }
}