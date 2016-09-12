import {Component} from '@angular/core';
import {Router} from "@angular/router-deprecated";
import {UserComponent} from "../../models/user/user.component";
import {ManageUsersService} from "../../../shared/services/src/manage-users.service";

/**
 * Component UserListComponent
 * The user list component
 */
@Component({
    selector: 'user-list',
    moduleId: module.id,
    templateUrl: './user-list.component.html',
    styleUrls : ['./user-list.component.css'],
    providers: [ManageUsersService]
})

export class UserListComponent  {

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
    constructor(private _manageUserService: ManageUsersService,
        private router:Router
    ){ }

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
    }

    /**
     * Function EditUser.
     * This function gets
     * @param userId
     */
    editUser(userId:string){
        console.log("user id: "+userId);
        this.router.navigate(['/user-components/edit-user', userId]);
    }

}