/**
 * Service ManageProjectService
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {ProjectModel} from "../../../components/models/project.model";
import {SuccessModel} from "../../../components/models/success.model";

@Injectable()
export class ManageProjectService {

    private _serverLink = 'http://ncevc-04296:3500/projects';
    private parameter:string[];

    /**
     * Constructor
     * @param http
     */
    constructor(private http:Http) {
        this.parameter=["id"];
    }

    /**
     * Function getProjects. This function makes a get HTTP request to the server
     * @returns {Promise<*>|Promise<T>}
     */
    getProjects() {
        return this.http.get(this._serverLink)
            .toPromise()
            .then(res =>  <ProjectModel[]> res.json())
            .catch(this.handleError);
    }

    /**
     * Function getProjectFromId. This function gets the Project from Project id.
     * @returns {Promise<*>|Promise<T>}
     */
    getProjectFromId(id:number){

        console.log("yes, id: "+id);
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
        console.log("yes");
        return this.http.get(currentServerLink)
            .toPromise()
            .then(res =>  <ProjectModel> res.json())
            .catch(this.handleError);
    }


    /**
     * Function updateProject. This function updates Project data.
     * @param ProjectJSON
     * @returns {Promise<ProjectModel>|Promise<*>|Promise<T>}
     */
    updateProject(ProjectJSON):Promise<ProjectModel> {
        let body = JSON.stringify(ProjectJSON);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let path = this._serverLink;
        return this.http.post(path, body, options)
            .toPromise()
            .then(res=> <ProjectModel> res.json())
            .catch(this.handleError);
    }

    /**
     * Function deleteProject.
     * This function deletes Project.
     * @param ProjectJSON
     * @returns {any}
     */
    deleteProject(ProjectJSON):Promise<ProjectModel> {
        let body = JSON.stringify(ProjectJSON);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this._serverLink}?id=${ProjectJSON.id}`;

        return this.http.delete(url, headers)
            .toPromise()
            .then(res=>
                <ProjectModel> res.json())
            .catch(this.handleError);
    }


    /**
     * Function AddProject. It adds a Project into the database and return a promise with the success or the failure
     * (SuccessModel) of the operation.
     * @param Project
     * @returns {any<T>|Promise<void>|Promise<T>|Promise<R>|any}
     */
    addProject(Project:ProjectModel):Promise<SuccessModel>{
        let body = JSON.stringify(Project);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.put(this._serverLink, body, options)
            .toPromise()
            .then(res=>
                <SuccessModel> res.json())
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