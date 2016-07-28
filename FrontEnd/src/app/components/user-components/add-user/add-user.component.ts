/**
 * Component AddUserComponent
 */

import {Component} from '@angular/core';
import {ManageUsersService} from "../../../shared/services/src/manage-users.service";
import {LoginPipe} from "../../../shared/pipes/src/loginPipe";
import {UserComponent} from "../../models/user/user.component";
import {ProjectComponent} from "../../+projects/project.component";
import {ProjectModel} from "../../models/project.model";
import {ManageProjectService} from "../../../shared/services/src/manage-project.service";

@Component({
    selector: 'add-user',
    moduleId: module.id,
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css'],
    providers: [ManageUsersService, ManageProjectService],
    pipes: [LoginPipe],
    directives: [ProjectComponent]
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

    //Variable tmp is used into pipe transformation
    public tmp:string;

    private dbUserTable;

    private projectListID:Array<number>;

    /**
     * Constructor AddUserComponent.
     * We inject ManageUserService into the component thanks to the parameters we give here. Then, it initializes
     * all the component attributes.
     * @param _manageUserService
     */
    constructor(private _manageUserService:ManageUsersService,
                private _manageProjectService:ManageProjectService) {
        this.submitted = false;
        this.userTypesValues = ["Admin", "Operational", "Developer", "Manager"];
        this.websitePartsValues = ["Metrics", "Performance"]; //TODO: TO use !
        this.reportsValues = ["Yes", "No"]; //TODO: TO use !
        this.user = new UserComponent("", "", "",
            "", false, false, false, false, "");
        this.dbUserTable = ["user_id", "full_name", "email_address", "type"];
        this.reportsN = "";
        this.reportsY = "";
        this.formCorrectlyFilled = true;
        this.projectListID = [];
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
        this.user.login = this.transformFullName();
        let projectArray=[];
        for(let i=0;i<this.projectListID.length;i++){
            projectArray.push({id:this.projectListID[i]});
        }
        let userJSON = {
            full_name: this.user.fullName,
            email_address: this.user.email,
            type: this.user.type.toLowerCase(),
            login: this.user.login,
            projects: projectArray
        };
        return userJSON;
    }


    /**
     * Function transformFullName
     * This function transforms the user full name according to login structure. To have
     * more information about the login structure, please check the pipe loginPipe.
     * @returns {string}
     */
    transformFullName() {
        let array = [];
        array = this.user.fullName.split(" ");
        let login = "";
        for (var i = 0; i < array.length; i++) {
            array[i] = array[i].toLowerCase();
            if (array[i].length > 0) {
                if (i == 0) {
                    login = array[i].toLowerCase();
                }
                else {
                    login = login + "." + array[i].toLowerCase();
                }
            }
        }
        return login;
    }


    /**
     * ProjectListHasChanged. We use this function when the user adds or deletes a new project.
     * The call comes from ProjectComponent outputs. The data received in parameters are
     * the current project ids selected. We save the id list and wait for the click on
     * the submit button. We don't call any function from ManageProjectService in order
     * to increase performances. The call will be in the onSubmit function.
     * @param projectIDList
     */
    projectListHasChanged(projectIDList:Array<number>) {
        this.projectListID = projectIDList;
    }


    /**
     * Function onSubmit.
     * The function is called when user click on the submit button in the form. If the form has been correctly filled,
     * we add the new user to the database by calling the manageUser service function  "AddUser".
     */
    onSubmit() {
        console.log("bha oui");
        if (this.formComplete()) {
            console.log("la aussi");
            this.submitted = true;
            let finalUserJSON = this.buildUserJSON();
            debugger;/*
            this._manageUserService.addUser(finalUserJSON).then(
                user => this.responseFromServer = user,
                error => this.errorFromServer = <any> error);


            /*this._manageProjectService.getProjectFromId(this.projectListID).then(
             projectList=> this.addUser(projectList,finalUserJSON),
             error => this.errorFromServer = <any> error
             );*/
        }
    }

    /**
     * AddUser calls the function addUser from ManageUserService in order to add it
     * into the database.
     * @param projectList
     * @param finalUserJSON

     addUser(projectList:Array<ProjectModel>,finalUserJSON){
        this._manageUserService.addUser(projectList, finalUserJSON).then(
            user => this.responseFromServer = user,
            error => this.errorFromServer = <any> error);
    }*/
}