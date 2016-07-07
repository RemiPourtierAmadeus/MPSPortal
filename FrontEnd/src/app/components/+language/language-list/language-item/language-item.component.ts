/**
 * Component LanguageLanguageListLanguageItemComponent
 */

import {Component, Input} from '@angular/core';
import {ManageLanguageService} from "../../../../shared/services/src/manage-language.service";
import {LanguageModel} from "../../../models/language.model";

@Component({
    selector: 'language-item',
    moduleId: module.id,
    templateUrl: './language-item.component.html',
    styleUrls: ['./language-item.component.css'],
    providers: [ManageLanguageService]
})
export class LanguageItemComponent {

    @Input('content') content:string;
    @Input('id') id:string;

    private descriptionClass:string;
    private pageState:string;
    private errorMessage:string;

    private language:LanguageModel;

    constructor(private manageLanguageService:ManageLanguageService) {
        this.pageState = "general";
        this.content = "";
        this.descriptionClass = "large-10";
        this.language = new LanguageModel();

    }

    ngOnInit() {
        this.language = new LanguageModel(this.id, this.content);


    }

    /**
     * Function to turn on edition process.
     */
    editLanguage() {
        this.pageState = "edit";
        this.descriptionClass = "large-8";
    }

    /**
     * Function to turn on delete process.
     */
    deleteLanguage() {
        this.pageState = "delete";
        this.descriptionClass = "large-8";
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


    verifySuccess(dataFromServer) {
        console.log("verifySuccess");
        if (dataFromServer[0].hasOwnProperty("success")) {
            console.log("into has own property");
            if (dataFromServer[0].success === "true") {
                console.log("jerentre");
                this.pageState = "general";
                this.descriptionClass = "large-10";
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
        this.descriptionClass = "large-10";
        this.pageState = "general";
    }

    /**
     * Function to confirm removal.
     */
    confirmDelete() {
        let language = {
            id: +this.id
        };
        this.manageLanguageService.deleteLanguage(language).then(
            success=> this.verifySuccess(success),
            error => this.errorMessage = error
        )
    }


}