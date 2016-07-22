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

    @Output() haveToDeleteLanguage=new EventEmitter<number>();

    private pageState:string;

    constructor(){
        this.pageState="general";
    }

    editProject(){

    }

    deleteProject(){

    }

}