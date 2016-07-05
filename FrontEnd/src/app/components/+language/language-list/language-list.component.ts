/**
 * Component LanguageComponentsLanguageListComponent
 */

import {Component} from '@angular/core';
import {LanguageModel} from "../../models/language.model";
import {ManageLanguageService} from "../../../shared/services/src/manage-language.service";
import {ItemListComponent} from "../../core/item-list/item-list.component";
import {LanguageItemComponent} from "./language-item/language-item.component";

@Component({
    selector: 'language-list',
    moduleId: module.id,
    templateUrl: './language-list.component.html',
    styleUrls: ['./language-list.component.css'],
    directives: [LanguageItemComponent],
    providers: [ManageLanguageService]
})
export class LanguageListComponent {

    private languages:Array<LanguageModel>;
    private test:string;

    /**
     * errorMessage: Attributes which stores potential error message after requesting the server
     */
    private errorMessage:string;

    /**
     * Constructor
     * @param manageLanguageService
     */
    constructor(private manageLanguageService:ManageLanguageService) {
        this.languages = [];
        this.test="<div class=\"row\"> <div class=\"large-8 medium-8 small-8\"></div> <div class=\"large-2 medium-2 small-2\"></div> <div class=\"large-2 medium-2 small-2\"></div> </div>"
    }

    /**
     * NgOnInit. This function is native to Angular 2. It will be executed while the component execution, just after
     * the constructor.
     */
    ngOnInit() {
        this.manageLanguageService.getLanguages().then(
            languages =>{  this.languages = languages},
            error => this.errorMessage = <any> error
        );
    }
}