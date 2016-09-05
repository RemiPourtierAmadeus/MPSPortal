/**
 * Service ManageStepService
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {StepModel} from "../../../components/models/step.model";

@Injectable()
export class ManageStepService {


    private _serverLink ='http://ncevc-04296:3500/steps';

    /**
     * Constructor
     * @param http
     */
    constructor(private http:Http) {}


    /**
     * Function getSteps. This function makes a get HTTP request to the server
     * @returns {Promise<*>|Promise<T>}
     */
    getSteps() {
        return this.http.get(this._serverLink)
            .toPromise()
            .then( res =>  <StepModel[]> res.json() )
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
        console.error(error);
        return Promise.reject(error|| error.json().error || 'Server error');
    }

}