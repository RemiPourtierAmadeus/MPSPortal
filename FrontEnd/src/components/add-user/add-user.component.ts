/**
 * Component AddUserComponent
 */

import {Component} from 'angular2/core';
import {UserComponent} from "../user/user.component";
import {ManageUsersService} from "../../shared/services/src/manage-users.service";
import {LoginPipe} from "../../shared/pipes/src/loginPipe";

@Component({
    selector: 'add-user',
    moduleId: module.id,
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css'],
    providers: [ManageUsersService],
    pipes:[LoginPipe]
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
    public reportsY;
    public reportsN;
    public formCorrectlyFilled;

    public userManager_error = false;
    public responseFromServer;
    public errorFromServer;

    private dbUserTable;
    private tmp;

    /**
     * Constructor AddUserComponent.
     * We inject ManageUserService into the component thanks to the parameters we give here. Then, it initializes
     * all the component attributes.
     * @param _manageUserService
     */
    constructor(private _manageUserService:ManageUsersService) {
        this.submitted = false;
        this.userTypesValues = ["Admin", "Operational", "Developer", "Manager"];
        this.websitePartsValues = ["Metrics", "Performance"]; //TODO: TO use !
        this.reportsValues = ["Yes", "No"]; //TODO: TO use !
        this.user = new UserComponent("", "", "",
            "", false, false, false,false, "");
        this.dbUserTable = ["user_id", "full_name", "email_address", "type"];
        this.reportsN = "";
        this.reportsY = "";
        this.formCorrectlyFilled = true;
        this.tmp="";
    }

    /**
     * Function formComplete.
     * The function verifies if the form has been correctly filled. It returns true if yes, else false.
     * @returns {boolean}
     */
    formComplete() {
        if (!this.user.metrics && !this.user.performance) {
            this.formCorrectlyFilled = false;
            return false;
        }
        return true;
    }

    /**
     * Function buildUserJSON.
     * The function builds the JSON from the user information filled in the form.
     * @returns JSON
     */
    buildUserJSON() {
        let userJSON = {
            full_name: this.user.fullName,
            email_address: this.user.email,
            type: this.user.type.toLowerCase(),
            login: this.user.login
        };
        return userJSON;
    }

    /**
     * Function onSubmit.
     * The function is called when user click on the submit button in the form. If the form has been correctly filled,
     * we add the new user to the database by calling the manageUser service function  "AddUser".
     */
    onSubmit() {
        if (this.formComplete()) {
            this.submitted = true;
            let finalUserJSON = this.buildUserJSON();
            console.log("json send to the db: "+finalUserJSON);
            this._manageUserService.addUser(finalUserJSON).then(
                user => this.responseFromServer = user,
                error => this.errorFromServer = <any> error);
        }
    }
}