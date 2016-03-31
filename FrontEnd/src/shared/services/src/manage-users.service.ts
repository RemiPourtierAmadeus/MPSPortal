/**
 * Service ManageUsersService
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from "rxjs/Observable";
import {Response, Headers, RequestOptions} from "angular2/http";

@Injectable()
export class ManageUsersService {
    private users;
    private serverLink;

    constructor(private http:Http) {
        /*this.users=this.http.get("localhost:3500/users");
         console.log(this.users);*/
        this.serverLink = 'http://ncevc-04296:3500/users';
    }

    getUsers() {
        //this.users=this.http.get("localhost:3500/users");
        return Observable.forkJoin(
            this.http.get(this.serverLink).map((res:Response)=>
                res = res.json()
            )
        );
    }


    addUser(userData) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        console.log("User data in addUSer service: "+userData);
        return this.http.post(this.serverLink, userData, options).map((res:Response)=>
            res = res.json()
        );
    }

    /*
     updateUsers(){
     return 0;
     }

     deleteUsers(){
     return 0;
     }*/

}