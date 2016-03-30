/**
 * Service ManageUsersService
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from "rxjs/Observable";
import {Response} from "angular2/http";

@Injectable()
export class ManageUsersService {
    private users;

    constructor(private http:Http) {
        /*this.users=this.http.get("localhost:3500/users");
         console.log(this.users);*/
    }

    getUsers() {
        //this.users=this.http.get("localhost:3500/users");
        return Observable.forkJoin(
            this.http.get('http://ncevc-04296:3500/users').map((res:Response)=>res.json())
        );
    }

    /*
     addUser(){
     return 0;

     }

     updateUsers(){
     return 0;

     }

     deleteUsers(){
     return 0;

     }*/

}