/**
 * Component LanguageLanguageListLanguageItemComponent
 */

import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ManageLanguageService} from "../../../../shared/services/src/manage-language.service";
import {LanguageModel} from "../../../models/language.model";

@Component({
    selector: 'language-item',
    moduleId: module.id,
    templateUrl: './language-item.component.html',
    styleUrls: ['./language-item.component.css'],
    providers: [ManageLanguageService],
    directives:[ROUTER_DIRECTIVES]
})
export class LanguageItemComponent {

    @Input('content') content:string;
    @Input('id') id:number;

    @Output() haveToDeleteLanguage=new EventEmitter<LanguageModel>();

    private descriptionClass:string;
    private pageState:string;
    private errorMessage:string;

    private language:LanguageModel;

    constructor(private manageLanguageService:ManageLanguageService) {
        this.pageState = "general";
        this.content = "";
        this.id=-1;
        this.descriptionClass = "large-10 large-centered";
        this.language = new LanguageModel(-1,"");
    }

    ngOnInit() {
        this.language = new LanguageModel(this.id, this.content);
    }

    /**
     * Function to turn on edition process.
     */
    editLanguage() {
        this.pageState = "edit";
        this.descriptionClass = "large-8 large-offset-1";
    }

    /**
     * Function to turn on delete process.
     */
    deleteLanguage() {
        this.pageState = "delete";
        this.descriptionClass = "large-8 large-offset-1";
    }

    /**
     * Function to confirm edition.
     */
    confirmEdit() {
        let language = {
            id: +this.id,
            name: this.content
        };
        this.manageLanguageService.updateLanguage(language).then(
            success=> this.verifySuccess(success),
            error => this.errorMessage = error
        )
    }

    /**
     * This function verifies the result from the database.
     * dataFromServer should have the following structure:
     * [{"success" : "true"}]
     * We just verifies this feedback. If success value is true, we call the function getLanguageFromId
     * in order to have the new version of the current language.
     * @param dataFromServer
     */
    verifySuccess(dataFromServer) {
        if (dataFromServer[0].hasOwnProperty("success")) {
            if (dataFromServer[0].success === "true") {
                this.pageState = "general";
                this.descriptionClass = "large-10 large-centered";
                this.manageLanguageService.getLanguageFromId(this.id).then(
                    language => {
                        this.language=language[0];
                    },
                    error => this.errorMessage = error
                );
            }
            else{
                this.errorMessage = "An error has occurred while the get language process";
            }
        }
        else {
            this.errorMessage = "An error has occurred in the language update";
        }
    }

    /**
     * Function to cancel any action.
     */
    cancelAction() {
        this.descriptionClass = "large-10 large-centered";
        this.pageState = "general";
        //this.router.navigate(["About"]);
    }

    /**
     * Function to confirm removal.
     */
    confirmDelete() {
        this.haveToDeleteLanguage.emit(this.language);

        /**
        this.manageLanguageService.deleteLanguage(language).then(
            success=> this.verifySuccess(success),
            error => this.errorMessage = error
        )**/
    }


}