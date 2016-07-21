/**
 * Component ProjectsAddProjectComponent
 */

import {Component} from '@angular/core';
import {ShowHideButtonComponent} from "../../core/show-hide-button/show-hide-button.component";
import {ProjectModel} from "../../models/project.model";
import {ManageProjectService} from "../../../shared/services/src/manage-project.service";

@Component({
    selector: 'add-project',
    moduleId: module.id,
    templateUrl: './add-project.component.html',
    styleUrls : ['./add-project.component.css'],
    directives: [ShowHideButtonComponent],
    providers: [ManageProjectService]
})
export class AddProjectComponent {

    private showForm:boolean;
    private projects:Array<ProjectModel>;
    private errorMessage:string;
    private projectNames:Array<string>;

    constructor(private manageProjectService:ManageProjectService){
        this.showForm=true;
        this.projects=[];
        this.projectNames=[];
    }

    ngOnInit(){
        this.manageProjectService.getProjects().then(
            projects => this.projects=projects,
            err => this.errorMessage=err
        );
    }

    search (term) {
        if(term.length>0){
            console.log(term);
            this.projectNames=[];
            for(let i=0;i<this.projects.length;i++){
                if(this.projects[i].name.indexOf(term)==0){
                    this.projectNames.push(this.projects[i].name);
                }
            }
        }
    }


    /**
     * The function showHideForm changes the attribute value of showForm in order to
     * display or hide the form.
     */
    showHideForm(show:boolean){
        this.showForm=show;
    }

    onSubmit(){
        //TODO: GET PROJECTS
    }
}