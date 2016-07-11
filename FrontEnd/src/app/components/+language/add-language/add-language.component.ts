/**
 * Component LanguageAddLanguageComponent
 */

import {Component, EventEmitter, Output } from '@angular/core';
import {ProjectModel} from "../../models/project.model";
import {ShowHideButtonComponent} from "../../core/show-hide-button/show-hide-button.component";
import {ManageLanguageService} from "../../../shared/services/src/manage-language.service";
import {LanguageModel} from "../../models/language.model";

@Component({
    selector: 'add-language',
    moduleId: module.id,
    templateUrl: './add-language.component.html',
    styleUrls : ['./add-language.component.css'],
    directives: [ShowHideButtonComponent],
    providers: [ManageLanguageService]
})
export class AddLanguageComponent {

    private descriptionClass:string;
    private showForm:boolean;
    private language:LanguageModel;
    private errorMessage:string;

    @Output() languageHasBeenCreated = new EventEmitter<boolean>();

    constructor(private manageLanguageService:ManageLanguageService){
        this.descriptionClass = "large-10";
        this.showForm=false;
        this.language=new LanguageModel();
    }

    /**
     * The function showHideForm changes the attribute value of showForm in order to
     * display or hide the form.
     */
    showHideForm(show:boolean){
        this.showForm=show;
    }

    onSubmit(){
        this.manageLanguageService.addLanguage(this.language).then(
            success => this.verifySuccess(success),
            error => this.errorMessage=error
        );
    }

    verifySuccess(success){

    }
}