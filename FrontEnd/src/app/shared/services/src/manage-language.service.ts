/**
 * Service ManageLanguageService
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {LanguageModel} from "../../../components/models/language.model";

@Injectable()
export class ManageLanguageService {

    private _serverLink = 'http://ncevc-04296:3500/languages';
    private parameter:string[];

    /**
     * Constructor
     * @param http
     */
    constructor(private http:Http) {
        this.parameter=["id"];
    }

    /**
     * Function getLanguages. This function makes a get HTTP request to the server
     * @returns {Promise<*>|Promise<T>}
     */
    getLanguages() {
        return this.http.get(this._serverLink)
            .toPromise()
            .then(res =>  <LanguageModel[]> res.json())
            .catch(this.handleError);
    }

    /**
     * Function getLanguageFromId. This function gets the language from language id.
     * @returns {Promise<*>|Promise<T>}
     */
    getLanguageFromId(id:number){

        /**
         * Variable currentServerLink.
         * We use this variable because we don't want to modify the attribute this._serverLink
         * himself by adding directly the id.
         * ex: this._serverLink=this._serverLink+"?id="+id
         * -----> TO AVOID ! Because the function will modify the _serverlink for all the action
         * of the page, it could break other functions of the service because they use _serverLink
         * @type {string}
         */
        let currentServerLink=this._serverLink+"?id="+id;

        return this.http.get(currentServerLink)
            .toPromise()
            .then(res =>  <LanguageModel[]> res.json())
            .catch(this.handleError);
    }

    /**
     * Function updateLanguage. This function updates language data.
     * @param languageJSON
     * @returns {Promise<LanguageModel>|Promise<*>|Promise<T>}
     */
    updateLanguage(languageJSON):Promise<LanguageModel> {
        let body = JSON.stringify(languageJSON);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let path = this._serverLink;
        return this.http.post(path, body, options)
            .toPromise()
            .then(res=> <LanguageModel> res.json())
            .catch(this.handleError);
    }

    /**
     * Function deleteLanguage.
     * This function deletes language.
     * @param languageJSON
     * @returns {any}
     */
    deleteLanguage(languageJSON):Promise<LanguageModel> {
        let body = JSON.stringify(languageJSON);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

       let url = `${this._serverLink}/${languageJSON.id}`;
        //debugger;

        return this.http.delete(url, headers)
            .toPromise()
            .then(res=>
                <LanguageModel> res.json())
            .catch(this.handleError);
    }

    /**
     * Function handleError. This function catches potential errors which come from
     * the server while a HTTP request.
     * @param error
     * @returns {Promise<void>|Promise<T>|Promise<*>}
     */
    private handleError(error:Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error || error.json().error || 'Server error');
    }


}