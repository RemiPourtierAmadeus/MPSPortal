/**
 * Component ProjectsProjectListComponent
 */

import {Component, Input} from '@angular/core';
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
        if(this.fromAddUser){

        }
        else{
            this.getProjects();
        }
    }

    ngOnChanges(){
        console.log("yes, i have: "+ this.newProject);

        this.manageProjectService.getProjectFromId(this.newProject).then(
            project => this.projects.push(project),
            err => this.errorMessage=err
        );
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

}