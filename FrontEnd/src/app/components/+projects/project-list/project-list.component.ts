/**
 * Component ProjectsProjectListComponent
 */

import {Component} from '@angular/core';
import {ProjectItemComponent} from "./project-item/project-item.component";
import {ProjectModel} from "../../models/project.model";

@Component({
    selector: 'project-list',
    moduleId: module.id,
    templateUrl: './project-list.component.html',
    styleUrls : ['./project-list.component.css'],
    directives: [ProjectItemComponent]
})
export class ProjectListComponent {


    private projects:Array<ProjectModel>;

    constructor(){
        this.projects= [];
    }

}