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
    public password2;

    @Input('user-generated') generatedPwd:number;
    @Input('user-id') userId:number;
    @Output() sendUser= new EventEmitter<UserComponent>();

    constructor(private _manageUserService:ManageUsersService) {}

    /**
     * Function ngOnInit.
     * We instanciate our current user from the component inputs.
     */
    ngOnInit(){
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
            user_id: this.user.userId,
            password: this.user.password,
            generatedPwd: this.user.generatedPwd
        };
        console.log("password: "+userJSON["password"]);
        console.log("user_id: "+userJSON["user_id"]);
        console.log("generatedPwd: "+userJSON["generatedPwd"]);
        return userJSON;
    }

    /**
     * Function samePassword.
     * This function verifies if the two given passwords are identical (but not empty). It returns true if yes,
     * else false.
     * @returns {boolean}
     */
    samePassword(){
        if(this.user.password!=="" && this.password2!==""
            && this.user.password===this.password2) return true;
        return false;
    }

    /**
     * Function emitErrorUser.
     * This function emits a user through the output in order to alert an other component
     * that an error has occured while the changing password phase.
     */
    emitErrorUser(){
        this.password2="";
        this.user= new UserComponent("", "", "",
            "", false, false, false,false, "", "",this.userId, "",  this.generatedPwd,
            "Given passwords are different.");
        this.sendUser.emit(this.user);
    }
    /**
     * Function onSubmit.
     * The function is called when user click on the submit button in the form. Then,
     * we build a JSON from data given by user (couple login/password) and then we send the data to the server.
     */
    onSubmit() {
        if(this.samePassword()){
            console.log("good password");

            let finalUserJSON = this.buildUserJSON();
            this._manageUserService.updateUser(finalUserJSON).then(
                user => 1, //this.user=user,
                error => this.errorFromServer = <any> error);
        }
        else{
            this.emitErrorUser();
        }
    }
}