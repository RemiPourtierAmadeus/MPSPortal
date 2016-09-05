/**
 * Service ManageNewsService
 */

import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {NewsModelComponent} from "../../../components/models/news-model/news-model.component";

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
     * Function getNews. This function makes a get HTTP request to the server
     * @returns {Promise<*>|Promise<T>}
     */
    getNews() {
        return this.http.get(this._serverLink)
            .toPromise()
            .then( res =>  <NewsModelComponent[]> res.json() )
            .catch(this.handleError);
    }

    /**
     * Function addNews.
     * This function adds a news into the database.
     * @param newsJSON
     * @returns {any}
     */
    addNews(newsJSON):  Promise<NewsModelComponent>  {
        let body = JSON.stringify( newsJSON );
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.put(this._serverLink, body, options)
            .toPromise()
            .then(res=>
                <NewsModelComponent> res.json())
            .catch(this.handleError);
    }

    /**
     * Function updateNews. This function updates news data.
     * @param newsJSON
     * @returns {Promise<NewsModelComponent>|Promise<*>|Promise<T>}
     */
    updateNews(newsJSON): Promise<NewsModelComponent>{
        let body = JSON.stringify( newsJSON );
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let path= this._serverLink;
        return this.http.post(path, body, options)
            .toPromise()
            .then(res=> <NewsModelComponent> res.json())
            .catch(this.handleError);
    }

    /**
     * Function deleteNews.
     * This function deletes the news into the database.
     * @param newsJSON
     * @returns {any}
    */
    deleteNews(newsJSON): Promise<NewsModelComponent>  {
        let body = JSON.stringify( newsJSON );
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url= `${this._serverLink}/${newsJSON.id}`;
        return this.http.delete(url, headers)
            .toPromise()
            .then(res=>
                <NewsModelComponent> res.json())
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