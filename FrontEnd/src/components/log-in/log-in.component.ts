/**
 * Component LogInComponent
 */

import {Component, EventEmitter} from 'angular2/core';
import {ManageUsersService} from "../../shared/services/src/manage-users.service";
import {UserComponent} from "../user/user.component";
import {ConnectionContentComponent} from "../connection-content/connection-content.component";
import {Output} from "angular2/core";

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
    public responseFromServer;
    public errorFromServer;

    private emailAddress;
    private subjectEmail;
    private emailCopy;
    public emailContent;

    public connectionFailed;

    @Output() sendErrorMessage= new EventEmitter<string>();
    /**
     * Constructor LogInComponent.
     * We inject ManageUserService into the component thanks to the parameters we give here.
     * Then, it initializes all the component attributes.
     * @param _manageUserService
     */
    constructor(private _manageUserService:ManageUsersService) {
        //super();
        this.emailAddress="mailto:GBS-GPA-SCS-MPS-Services@amadeus.com";
        this.subjectEmail="?subject=MPS Metrics and Performance";
        this.emailCopy="&cc=jdoucet@amadeus.com";
        this.emailContent=this.emailAddress+this.subjectEmail+this.emailCopy;
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

        console.log("user json: "+userJSON["password"]);
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
            this.sendErrorMessage.emit("The couple username/password is not correct.");
        }
        else{
            this.submitted = true;
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
            user => this.redirect(user), //this.user=user,
            error => this.errorFromServer = <any> error);
    }//z36KF0zp
}