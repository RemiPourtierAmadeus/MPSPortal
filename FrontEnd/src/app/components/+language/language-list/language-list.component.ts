/**
 * Component LanguageComponentsLanguageListComponent
 */

import {Component, Input} from '@angular/core';
import {LanguageModel} from "../../models/language.model";
import {ManageLanguageService} from "../../../shared/services/src/manage-language.service";
import {ItemListComponent} from "../../core/item-list/item-list.component";
import {LanguageItemComponent} from "./language-item/language-item.component";
import {SuccessModel} from "../../models/success.model";

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

    @Input("getRequest") requestAGet:string;

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
        this.requestAGet="";
    }

    /**
     * NgOnInit. This function is native to Angular 2. It will be executed while the component execution, just after
     * the constructor.
     */
    ngOnInit() {
        this.getLanguages()
    }

    /**
     * ngOnChanges.
     * It's a native function in Angular 2. It will be executed while one of the component attributes
     * have been changed.
     */
    ngOnChanges(){
        this.getLanguages();
    }

    /**
     * Function getLanguages.
     * This function calls the function getLanguages from ManageLanguageService
     * in order to have the languages list from the database.
     */
    getLanguages(){
        this.manageLanguageService.getLanguages().then(
            languages => this.languages = languages,
            error => this.errorMessage = <any> error
        );
    }

    /**
     * DeleteLanguage calls the service deleteLanguage from ManageLanguageService in order to delete the
     * language which comes from a LanguageItemComponent.
     * @param language
     */
    deleteLanguage(language:LanguageModel){
        this.manageLanguageService.deleteLanguage(language).then(
            res => this.verifyResult(res),
            error => this.errorMessage=error
        );
    }

    /**
     * This function verifies the result from the database.
     * dataFromServer should have the following structure:
     * [{"success" : "true"}]
     * We just verifies this feedback. If success value is true, we call the function getLanguages
     * in order to have the new version of the language list.
     * @param dataFromServer
     */
    verifyResult(dataFromServer){
        if(dataFromServer[0].hasOwnProperty("success")){
            if(dataFromServer[0].success==="true"){
                this.getLanguages();
            }
            else{
                this.errorMessage="A problem has occurred while the delete phase";
            }
        }
    }

}