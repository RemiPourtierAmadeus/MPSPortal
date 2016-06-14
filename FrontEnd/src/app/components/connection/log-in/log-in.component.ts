/**
 * Component LogInComponent
 */

import {Component, EventEmitter} from '@angular/core';
import {ConnectionContentComponent} from "../connection-content/connection-content.component";
import {Output} from "@angular/core";
import {Input} from "@angular/core";
import {UserComponent} from "../../models/user/user.component";
import {ManageUsersService} from "../../../shared/services/src/manage-users.service";

@Component({
    selector: 'log-in',
    moduleId: module.id,
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css'],
    providers: [ManageUsersService]
})

export class LogInComponent{

    public user;
    public submitted;
    public errorFromServer;

    public connectionFailed;

    @Input('email-content') emailContent:string;
    @Output() sendUser= new EventEmitter<UserComponent>();
    /**
     * Constructor LogInComponent.
     * We inject ManageUserService into the component thanks to the parameters we give here.
     * Then, it initializes all the component attributes.
     * @param _manageUserService
     */
    constructor(private _manageUserService:ManageUsersService) {
        //super();
        this.connectionFailed=false;
        this.user = new UserComponent("", "", "",
            "", false, false, false, false, "","");
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
        this.user=responseFromDB[0];
        if(this.user.user_id==-1){
            this.connectionFailed=true;
            this.user= new UserComponent("", "", "",
                    "", false, false, false,false, "", "",-1, "", 1,
                "The couple username/password is not correct.");
            this.sendUser.emit(this.user);
        }
        else{
            this.user= new UserComponent("", "", "",
                "", false, false, false,false, "", "",this.user.user_id, "",  this.user.generatedPwd,
                "");
            this.submitted = true;
            this.sendUser.emit(this.user);
        }
    }

    /**
     * Function forgotPwd.
     * This function send to the pattern component the following error "Forgot password" to inform it
     * the user asks for the forgot password page.
     */
    forgotPwd(){
        this.user= new UserComponent("", "", "",
            "", false, false, false,false, "", "",-1, "", 1,
            "Forgot password");
        this.sendUser.emit(this.user);
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