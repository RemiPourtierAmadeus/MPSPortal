/**
 * Component ProjectsProjectListComponent
 */

import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ProjectItemComponent} from "./project-item/project-item.component";
import {ProjectModel} from "../../models/project.model";
import {ManageProjectService} from "../../../shared/services/src/manage-project.service";

@Component({
    selector: 'project-list',
    moduleId: module.id,
    templateUrl: './project-list.component.html',
    styleUrls : ['./project-list.component.css'],
    directives: [ProjectItemComponent],
    providers: [ManageProjectService]
})
export class ProjectListComponent {

    private projects:Array<ProjectModel>;
    private errorMessage:string;

    @Input("newProject") newProject:number;
    /**
     * Input fromAddUser.
     * We use this attribute to know what to display to user.
     * If:
     * - AddUserComponent requests the projectList structure, we won't get all projects, users
     * will have the possibility to select projects they need.
     * - ProjectComponent requests the projectLists component, we will get all projects in order
     * to allow admin to manage all projects stored in the database.
     */
    @Input("fromAddUser") fromAddUser:boolean;
    @Output() projectToDelete=new EventEmitter<number>();

    /**
     * Constructor
     * @param manageProjectService
     */
    constructor(private manageProjectService:ManageProjectService){
        this.projects= [];
        this.fromAddUser=false;
    }

    /**
     * NgOnInit. This function is native to Angular 2. It will be executed while the component execution, just after
     * the constructor.
     */
    ngOnInit(){
    }

    ngOnChanges(){
        if(this.newProject!=-1){
            this.manageProjectService.getProjectFromId(this.newProject).then(
                project => this.projects.push(project[0]),
                err => this.errorMessage=err
            );
        }
    }

    /**
     * Function getProjects.
     * This function calls the function getProjects from ManageProjectService
     * in order to have the projects list from the database.
     */
    getProjects(){
        this.manageProjectService.getProjects().then(
            languages => this.projects = languages,
            error => this.errorMessage = <any> error
        );
    }

    /**
     * Function deleteProject remove from the list of projects the project which have the same id as in parameter.
     * At the end, we emit to the pattern component in order to inform it the project has been removed.
     * @param id
     */
    deleteProject(id:number){
        for(let i=0;i<this.projects.length;i++){
            if(this.projects[i].id==id){
                this.projects.splice(i,1);
            }
        }
        this.projectToDelete.emit(id);
    }

}