/**
 * Service ManageUsersService
 */
import {Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Injectable()
export class ManageUsersService {
    private users;
    private http;
    constructor(http:Http){
        this.http=http;
        this.users=http.get("localhost:3500/users");
        console.log(this.users);
    }

    getUsers(){
        this.users=this.http.get("localhost:3500/users");
        return 0;
    }

    addUser(){
        return 0;

    }

    updateUsers(){
        return 0;

    }

    deleteUsers(){
        return 0;

    }

}