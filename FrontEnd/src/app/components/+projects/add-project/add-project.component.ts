/**
 * Component ProjectsAddProjectComponent
 */

import {Component} from '@angular/core';
import {ShowHideButtonComponent} from "../../core/show-hide-button/show-hide-button.component";

@Component({
    selector: 'add-project',
    moduleId: module.id,
    templateUrl: './add-project.component.html',
    styleUrls : ['./add-project.component.css'],
    directives: [ShowHideButtonComponent],
})
export class AddProjectComponent {

    private showForm:boolean;

    constructor(){
        this.showForm=false;
    }

    /**
     * The function showHideForm changes the attribute value of showForm in order to
     * display or hide the form.
     */
    showHideForm(show:boolean){
        this.showForm=show;
    }
}