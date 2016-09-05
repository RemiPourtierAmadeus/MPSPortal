/**
 * Component LanguageLanguageComponent
 */

import {Component} from '@angular/core';
import {LanguageListComponent} from "./language-list/language-list.component";
import {LanguageItemComponent} from "./language-list/language-item/language-item.component";
import {AddLanguageComponent} from "./add-language/add-language.component";
import {SuccessModel} from "../models/success.model";
import {LanguageModel} from "../models/language.model";

@Component({
    selector: 'language',
    moduleId: module.id,
    templateUrl: './language.component.html',
    styleUrls : ['./language.component.css'],
    directives: [LanguageListComponent,
        AddLanguageComponent
    ]
})
export class LanguageComponent {

    private language:LanguageModel;

    /**
     * Constructor.
     */
    constructor(){
        this.language = new LanguageModel(-1,"");
    }

    /**
     * RefreshLanguageList.
     * It changes the attribute language according to AddLanguageComponent output. Changes on this.language
     * will automatically have an impact on language list.
     * @param language
     */
    refreshLanguageList(language:LanguageModel){
        this.language=language;
    }
}