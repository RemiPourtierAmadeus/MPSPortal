/**
 * Component LanguageAddLanguageComponent
 */

import {Component, EventEmitter, Output } from '@angular/core';
import {ProjectModel} from "../../models/project.model";
import {ShowHideButtonComponent} from "../../core/show-hide-button/show-hide-button.component";
import {ManageLanguageService} from "../../../shared/services/src/manage-language.service";
import {LanguageModel} from "../../models/language.model";
import {SuccessModel} from "../../models/success.model";

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

    @Output() languageHasBeenCreated = new EventEmitter<LanguageModel>();

    constructor(private manageLanguageService:ManageLanguageService){
        this.descriptionClass = "large-10";
        this.showForm=false;
        this.language=new LanguageModel(-1,"");
    }

    /**
     * The function showHideForm changes the attribute value of showForm in order to
     * display or hide the form.
     */
    showHideForm(show:boolean){
        this.showForm=show;
    }

    /**
     * Function onSubmit.
     * This function will be call while user clicks on the submit button into the form. It calls
     * the function addLanguage from the ManageLanguageService with the component attribute language
     * which contains the name filled by user. The function add language will make a put request in order
     * to add the language into the database.
     */
    onSubmit(){
        this.manageLanguageService.addLanguage(this.language).then(
            success => this.verifySuccess(success),
            error => this.errorMessage=error
        );
    }

    /**
     * VerifySuccess.
     * If the information received from the database are correct, we can alert other components of the page.
     * To give you the information we use outputs and we directly send the id of the new language.
     * @param success
     */
    verifySuccess(success){
        if(success[0].id>=0){
            this.languageHasBeenCreated.emit(success[0]);
            this.language=new LanguageModel(-1,"");
        }
    }
}