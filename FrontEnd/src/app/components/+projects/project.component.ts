/**
 * Component ProjectComponent
 */

import {Component, Output} from '@angular/core';
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

    @Output() projectList:Array<number>;

    constructor(){
        this.newProject=-1;
        this.projectRemoved=-1;
        this.projectList=[];
    }

    addProject(projectID:number){
        this.newProject=projectID;
        this.projectList.push(projectID);
        console.log("add current id: "+projectID);
    }


    deleteProject(projectID:number){
        this.projectRemoved=projectID;

        this.projectList.slice(this.projectList.indexOf(projectID),1);
        console.log("delete current id: "+projectID);
    }
}