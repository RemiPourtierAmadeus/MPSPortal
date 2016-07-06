/**
 * Component LanguageLanguageListLanguageItemComponent
 */

import {Component, Input} from '@angular/core';

@Component({
    selector: 'language-item',
    moduleId: module.id,
    templateUrl: './language-item.component.html',
    styleUrls : ['./language-item.component.css']
})
export class LanguageItemComponent {

    @Input('content') content:string;

    private descriptionClass:string;
    private pageState:string;

    constructor(){
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