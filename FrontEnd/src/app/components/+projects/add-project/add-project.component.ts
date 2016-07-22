/**
 * Component ProjectsAddProjectComponent
 */

import {Component, Output, EventEmitter, Input} from '@angular/core';
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

    private projectAlreadyAdded:Array<string>;
    @Output() sendProject=new EventEmitter<number>();

    constructor(private manageProjectService:ManageProjectService){
        this.showForm=true;
        this.projects=[];
        this.projectNames=[];
        this.projectAlreadyAdded=[];
    }

    ngOnInit(){
        this.manageProjectService.getProjects().then(
            projects => this.projects=projects,
            err => this.errorMessage=err
        );
    }

    /**
     * The function search extracts from projects list the project which has a name with as a prefix
     * the name of the project.
     * @param term
     */
    search (term:string) {
        term= term.toLowerCase();
        if(term.length>0){
            console.log(term);
            this.projectNames=[];
            for(let i=0;i<this.projects.length;i++){
                if(this.projects[i].name.toLowerCase().indexOf(term)==0){
                    this.projectNames.push(this.projects[i].name);
                }
            }
        }
        else{
            this.projectNames=[];
        }
    }


    /**
     * The function showHideForm changes the attribute value of showForm in order to
     * display or hide the form.
     */
    showHideForm(show:boolean){
        this.showForm=show;
    }

    addProject(name:string){
        console.log("name: "+name);
        for(let i=0;i<this.projects.length;i++){
            if(name === this.projects[i].name){
                this.sendProject.emit(this.projects[i].id);
                this.projectAlreadyAdded.push(name);
                break;
            }
        }
    }

    onSubmit(){
        //TODO: GET PROJECTS
    }
}