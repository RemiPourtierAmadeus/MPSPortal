/**
 * Component ForgotPwdComponent
 */

import {Component, EventEmitter, Output} from 'angular2/core';
import {Input} from "angular2/core";
import {UserComponent} from "../../user-components/user/user.component";
import {ManageUsersService} from "../../../shared/services/src/manage-users.service";

@Component({
    selector: 'forgot-pwd',
    moduleId: module.id,
    templateUrl: './forgot-pwd.component.html',
    styleUrls : ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent {

    public user:UserComponent;
    private errorFromServer;
    private submitted;

    @Input('email-content') emailContent:string;
    @Output() sendUser= new EventEmitter<UserComponent>();

    constructor(private _manageUserService:ManageUsersService) {
        this.user = new UserComponent("", "", "",
            "", false, false, false, false, "","");
    }

    /**
     * Function backToConnection
     * This function outputs a new user with the error "Login" to inform the component which use
     * ForgotPwd that the use would like to see the login component.
     */
    backToConnection(){
        this.user= new UserComponent("", "", "",
            "", false, false, false,false, "", "",-1, "", 1,
            "Login");
        this.sendUser.emit(this.user);
    }
    /**
     * Function buildUserJSON.
     * The function builds the JSON from the user information filled in the form.
     * @returns JSON
     */
    buildUserJSON() {
        let userJSON = {
            email_address: this.user.email
        };
        return userJSON;
    }

    /**
     * Function redirect.
     * This function will check the value of the user id we get back from the database.
     * If the value is -1: the username/password is incorrect
     * If the value is bigger or equals than 0: the username/password is correct
     * We redirect to the home page while the connection succeed else we display the
     * connection failure to inform user.
     * @param responseFromDB
     */
    redirect(responseFromDB){
        let userFromDB=responseFromDB[0];
        if(userFromDB.user_id==-1){
            this.user= new UserComponent("", "", "",
                "", false, false, false,false, "", "",-1, "", 1,
                "Unkown email. Verify your email address or contact us");
            this.sendUser.emit(this.user);
        }
        else{
            this.user= new UserComponent("", "", "",
                "", false, false, false,false, "", "",userFromDB.user_id, "",  this.user.generatedPwd,
                "Email sent");
            this.submitted = true;
            this.sendUser.emit(this.user);
        }
    }

    /**
     * Function onSubmit.
     * The function is called when user click on the submit button in the form. Then,
     * we build a JSON from data given by user (couple login/password) and then we send the data to the server.
     */
    onSubmit() {
        let finalUserJSON = this.buildUserJSON();
        this._manageUserService.connect(finalUserJSON).then(
            user => this.redirect(user),
            error => this.errorFromServer = <any> error);
    }

}