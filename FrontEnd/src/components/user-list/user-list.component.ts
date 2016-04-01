/**
 * Component UserListComponent
 */

import {Component} from 'angular2/core';
import {ManageUsersService} from "../../shared/services/src/manage-users.service";

@Component({
    selector: 'user-list',
    moduleId: module.id,
    templateUrl: './user-list.component.html',
    styleUrls : ['./user-list.component.css']
})
export class UserListComponent {
    public userManager;
    public userManager_error = false;

    constructor(private _manageUserService: ManageUsersService){

        this._manageUserService.getUsers().subscribe(
         data => {
         this.userManager = data[0];
         },
         err => { this.userManager_error = true },
         () => console.log('done')
         );

    }
}