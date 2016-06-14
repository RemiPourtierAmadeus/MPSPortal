
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {UserComponent} from "../../../components/models/user/user.component";


/**
 * Service ManageUsersService.
 * The service contains all functions to manage users in the server. They use HTTP requests
 * to pass information from the front-end to the back-end.
 */
@Injectable()
export class ManageUsersService {

    private users;
    private _serverLink ='http://ncevc-04296:3500/users';
    private extensionLink=["/connect"];

    /**
     * Constructor
     * @param http
     */
    constructor(private http:Http) {}

    /**
     * Function getUsers. This function makes a get HTTP request to the server
     * @returns {Promise<*>|Promise<T>}
     */
    getUsers() {
        return this.http.get(this._serverLink)
            .toPromise()
            .then( res => <UserComponent[]> res.json() )
            .catch(this.handleError);
    }

    /**
     * Function addUser. This function adds a user into the database thanks to
     * a put HTTP request.
     * @param user_id
     * @returns {Promise<*>|Promise<T>}
     */
    addUser(userJSON): Promise<UserComponent>  {
        let body = JSON.stringify( userJSON );
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.put(this._serverLink, body, options)
            .toPromise()
            .then(res=> <UserComponent> res.json().data)
            .catch(this.handleError);
    }

    /**
     * Function updateUser. This function updates user data.
     * @param userJSON
     * @returns {Promise<UserComponent>|Promise<*>|Promise<T>}
     */
    updateUser(userJSON): Promise<UserComponent>{
        let body = JSON.stringify( userJSON );
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let path= this._serverLink;
        return this.http.post(path, body, options)
            .toPromise()
            .then(res=> <UserComponent> res.json())
            .catch(this.handleError);
    }

    /**
     * Function connect.
     * This function verifies information given by user with a post HTTP request.
     * @param userJSON
     * @returns {Promise<UserComponent>|Promise<*>|Promise<T>}
     */
    connect(userJSON): Promise<UserComponent>{
        let body = JSON.stringify( userJSON );
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let path= this._serverLink+this.extensionLink[0];
        return this.http.post(path, body, options)
            .toPromise()
            .then(res=> <UserComponent> res.json())
            .catch(this.handleError);
    }

    /**
     * Function handleError. This function catches potential errors which come from
     * the server while a HTTP request.
     * @param error
     * @returns {Promise<void>|Promise<T>|Promise<*>}
     */
    private handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.log("error la");
        console.error(error);
        return Promise.reject(error|| error.json().error || 'Server error');
    }
}