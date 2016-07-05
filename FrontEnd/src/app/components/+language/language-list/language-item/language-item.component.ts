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

    private pageState:string;

    constructor(){
        this.pageState="general";
        this.content="";
    }

    /**
     * Function to turn on edition process.
     */
    editLanguage(){
        this.pageState="edit";
    }

    /**
     * Function to turn on delete process.
     */
    deleteLanguage(){
        this.pageState="delete";
    }

    /**
     * Function to confirm edition.
     */
    confirmEdit(){}

    /**
     * Function to cancel edition.
     */
    cancelEdit(){}

    /**
     * Function to confirm removal.
     */
    confirmDelete(){}

    /**
     * Function to cancel removal.
     */
    cancelDelete(){}

}