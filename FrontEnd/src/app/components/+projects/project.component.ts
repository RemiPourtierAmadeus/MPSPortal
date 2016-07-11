/**
 * Component ProjectComponent
 */

import {Component} from '@angular/core';
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
export class ProjectComponent { }