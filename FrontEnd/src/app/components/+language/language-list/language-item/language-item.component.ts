/**
 * Component LanguageLanguageListLanguageItemComponent
 */

import {Component, Input} from '@angular/core';
import {ManageLanguageService} from "../../../../shared/services/src/manage-language.service";

@Component({
    selector: 'language-item',
    moduleId: module.id,
    templateUrl: './language-item.component.html',
    styleUrls : ['./language-item.component.css'],
    providers: [ManageLanguageService]
})
export class LanguageItemComponent {

    @Input('content') content:string;
    @Input('id') id:string;

    private descriptionClass:string;
    private pageState:string;
    private errorMessage:string;

    constructor(private manageLanguageService:ManageLanguageService){
        this.pageState="general";
        this.content="";
        this.descriptionClass="large-10";
    }

    /**
     * Function to turn on edition process.
     */
    editLanguage(){
        this.pageState="edit";
        this.descriptionClass="large-8";
    }

    /**
     * Function to turn on delete process.
     */
    deleteLanguage(){
        this.pageState="delete";
        this.descriptionClass="large-8";
    }

    /**
     * Function to confirm edition.
     */
    confirmEdit(){

        let language={
            id: +this.id,
            name:this.content
        }
        console.log("into confirm edit");
        this.manageLanguageService.updateLanguage(language).then(
            success=> this.verifySuccess(success),
            error => this.errorMessage=error
        )
    }

    verifySuccess(dataFromServer){
        console.log("into verify: "+dataFromServer);
        if(dataFromServer.hasOwnProperty("success")){
            if(dataFromServer.success==true){

            }
        }
        else{
            this.errorMessage="An error has occurred in the language update";
        }
    }

    /**
     * Function to cancel any action.
     */
    cancelAction(){
        this.descriptionClass="large-10";
        this.pageState="general";
    }

    /**
     * Function to confirm removal.
     */
    confirmDelete(){

    }



}