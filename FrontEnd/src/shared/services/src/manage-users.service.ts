/**
 * Service ManageUsersService
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from "rxjs/Observable";
import {Response, Headers, RequestOptions} from "angular2/http";
import {UserComponent} from "../../../components/user/user.component";

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


    addUser(full_name: string): Observable<UserComponent>  {

        var tmp='{user_id : "5", full_name : "Pierre"}';
        //let body = JSON.parse(tmp); //stringify({ tmp });
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        console.log("User data in addUSer service: "+tmp);
        return this.http.post(this.serverLink, tmp, options).
            map( res=><UserComponent> res.json().data).
            catch(this.handleError);
    }

    private handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    /*
     updateUsers(){
     return 0;
     }

     deleteUsers(){
     return 0;
     }*/

}