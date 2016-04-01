import {Component, onInit} from 'angular2/core';
import {ManageUsersService} from "../../shared/services/src/manage-users.service";
import {UserComponent} from "../user/user.component";

/**
 * Component UserListComponent
 * The user list component
 */
@Component({
    selector: 'user-list',
    moduleId: module.id,
    templateUrl: './user-list.component.html',
    styleUrls : ['./user-list.component.css']
})

export class UserListComponent implements onInit {

    /**
     * errorMessage: Attributes which stores potential error message after requesting the server
     */
    errorMessage: string;

    /**
     * users: Users list
     */
    users: UserComponent[];

    /**
     * Constructor
     * @param _manageUserService
     */
    constructor(private _manageUserService: ManageUsersService){ }

    /**
     * Function ngOnInit. This function is native to Angular 2. It will be executed while the component execution, just after
     * the constructor.
     */
    ngOnInit(){
        this.getUsers();
    }

    /**
     * Function getUsers. This function calls the function getUsers of ManageUserService in order to
     * make a HTTP request. It saves information received from the server and update the user list
     * and the error message.
     */
    getUsers(){
        this._manageUserService.getUsers().then(
            users => this.users=users,
            error => this.errorMessage= <any> error);
        console.log("Into getUsers: "+this.users);
    }

    /**
     * Function addUsers. The function gets in parameters user information and then call the function
     * addUser from ManageUserService in order to store the new user into the database.
     * @param name
     */
    addUsers(name:string){
        if(!name){
            return;
        }
        this._manageUserService.addUser(name).then(
            user => this.users.push(user),
            error => this.errorMessage = <any> error);
    }


}