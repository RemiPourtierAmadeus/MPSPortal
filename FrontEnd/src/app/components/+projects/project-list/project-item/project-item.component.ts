/**
 * Component ProjectsProjectItemComponent
 */

import {Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'project-item',
    moduleId: module.id,
    templateUrl: './project-item.component.html',
    styleUrls : ['./project-item.component.css']
})
export class ProjectItemComponent {

    @Input('name') name:string;
    @Input('id') id:number;

    @Output() projectToDelete=new EventEmitter<number>();

    private pageState:string;

    constructor(){
        this.pageState="general";
    }

    deleteProject(){
        this.projectToDelete.emit(this.id);
    }

}