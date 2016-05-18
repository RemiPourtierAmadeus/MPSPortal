/**
 * Service ManageNewsService
 */
import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {NewsModelComponent} from "../../../components/news-model/news-model.component";
import {Response} from "angular2/http";

@Injectable()
export class ManageNewsService {

    private news;
    private _serverLink ='http://ncevc-04296:3500/news';
    private extensionLink: string[];

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
            .then( res => <NewsModelComponent[]> res.json() )
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