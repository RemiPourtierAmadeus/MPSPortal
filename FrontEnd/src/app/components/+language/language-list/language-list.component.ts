/**
 * Component LanguageComponentsLanguageListComponent
 */

import {Component} from '@angular/core';
import {LanguageModel} from "../../models/language.model";
import {ManageLanguageService} from "../../../shared/services/src/manage-language.service";

@Component({
    selector: 'language-list',
    moduleId: module.id,
    templateUrl: './language-list.component.html',
    styleUrls: ['./language-list.component.css'],
    providers: [ManageLanguageService]
})
export class LanguageListComponent {

    private languages:Array<LanguageModel>;

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