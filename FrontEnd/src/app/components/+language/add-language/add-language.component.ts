/**
 * Component LanguageAddLanguageComponent
 */

import {Component} from '@angular/core';
import {ProjectModel} from "../../models/project.model";
import {ShowHideButtonComponent} from "../../core/show-hide-button/show-hide-button.component";

@Component({
    selector: 'add-language',
    moduleId: module.id,
    templateUrl: './add-language.component.html',
    styleUrls : ['./add-language.component.css'],
    directives: [ShowHideButtonComponent]
})
export class AddLanguageComponent {

    private descriptionClass:string;
    private showForm:boolean;
    private content:string;

    constructor(){
        this.descriptionClass = "large-10";
        this.showForm=false;
        this.content="";
    }

    /**
     * The function showHideForm changes the attribute value of showForm in order to
     * display or hide the form.
     */
    showHideForm(show:boolean){
        this.showForm=show;
    }

}