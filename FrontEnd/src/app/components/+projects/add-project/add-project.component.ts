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
    styleUrls: ['./add-project.component.css'],
    directives: [ShowHideButtonComponent],
    providers: [ManageProjectService]
})
export class AddProjectComponent {

    private showForm:boolean;
    private projects:Array<ProjectModel>;
    private errorMessage:string;

    /**
     * Array which contains all the project names to display
     */
    private projectNames:Array<string>;

    private projectAlreadyAdded:Array<string>;
    @Output() sendProject = new EventEmitter<number>();
    @Input("projectRemoved") projectRemoved:number;

    constructor(private manageProjectService:ManageProjectService) {
        this.showForm = false;
        this.projects = [];
        this.projectNames = [];
        this.projectAlreadyAdded = [];
    }

    ngOnInit() {
        this.manageProjectService.getProjects().then(
            projects => this.projects = projects,
            err => this.errorMessage = err
        );
    }

    ngOnChanges(){
        if(this.projectRemoved>-1){
            this.manageProjectService.getProjectFromId(this.projectRemoved).then(
                project => this.addAgainProject(project),
                err => this.errorMessage=err
            );
        }
    }

    addAgainProject(project:ProjectModel){
        /*this.projectAlreadyAdded.splice(this.projectAlreadyAdded.indexOf(project.name),1);
        this.projectNames=[];
        this.projects.push(project);*/
    }

    /**
     * The function search extracts from projects list the project which has a name with as a prefix
     * the name of the project.
     * @param term
     */
    search(term:string) {
        term = term.toLowerCase();
        if (term.length > 0) {
            this.projectNames = [];
            for (let i = 0; i < this.projects.length; i++) {
                console.log("project: " + this.projectAlreadyAdded.indexOf(this.projects[i].name));

                if (this.projects[i].name.toLowerCase().indexOf(term) == 0
                    && this.projectAlreadyAdded.indexOf(this.projects[i].name) == -1
                ) {
                    this.projectNames.push(this.projects[i].name);
                }
            }
        }
        else {
            this.projectNames = [];
        }
    }


    /**
     * The function showHideForm changes the attribute value of showForm in order to
     * display or hide the form.
     */
    showHideForm(show:boolean) {
        this.showForm = show;
    }


    /**
     * Function addProject emit the project id throught component output attribute this.sendProject.
     * We also add the name of the project into projectAlreadyAdded in order to avoid to show this
     * project again to the user if he launch a new search. We also remove the current project from the
     * projectNames attribute in order to make disappear the proposition just after the click.
     * @param name
     */
    addProject(name:string) {
        for (let i = 0; i < this.projects.length; i++) {
            if (name === this.projects[i].name) {
                this.sendProject.emit(this.projects[i].id);
                this.projectAlreadyAdded.push(name);
                this.projectNames.splice(this.projectNames.indexOf(name), 1);
                break;
            }
        }
    }

    /**
     * Function getAllprojects add all projects list into the displayed list.
     */
    getAllProjects() {
        this.projectNames = [];
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projectAlreadyAdded.indexOf(this.projects[i].name) == -1) {
                this.projectNames.push(this.projects[i].name);
            }
        }
    }

    onSubmit() {
        //TODO: GET PROJECTS
    }
}