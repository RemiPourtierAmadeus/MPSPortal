/**
 * Component ProjectComponent
 */

import {Component, Output, EventEmitter} from '@angular/core';
import {ProjectListComponent} from "./project-list/project-list.component";
import {AddProjectComponent} from "./add-project/add-project.component";

@Component({
    selector: 'project',
    moduleId: module.id,
    templateUrl: './project.component.html',
    styleUrls : ['./project.component.css'],
    directives: [ProjectListComponent,
                AddProjectComponent]
})
export class ProjectComponent {

    private newProject:number;
    private projectRemoved:number;

    private projectList:Array<number>;
    @Output() sendProjectList =new EventEmitter<Array<number>>();

    constructor(){
        this.newProject=-1;
        this.projectRemoved=-1;
        this.projectList=[];
    }

    /**
     * AddProject. When a user clicks on a project into the project list, we call the function
     * addProject in order to save the current project and send the current selected projects
     * to other component through output.
     * @param projectID
     */
    addProject(projectID:number){
        this.newProject=projectID;
        this.projectList.push(projectID);
        console.log("add current id: "+projectID);
        this.sendProjectList.emit(this.projectList);
    }


    /**
     * DeleteProject
     * @param projectID
     */
    deleteProject(projectID:number){
        this.projectRemoved=projectID;

        this.projectList.slice(this.projectList.indexOf(projectID),1);
        this.sendProjectList.emit(this.projectList);
        console.log("delete current id: "+projectID);
    }
}