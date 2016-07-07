/**
 * Component LanguageLanguageComponent
 */

import {Component} from '@angular/core';
import {LanguageListComponent} from "./language-list/language-list.component";
import {LanguageItemComponent} from "./language-list/language-item/language-item.component";
import {AddLanguageComponent} from "./add-language/add-language.component";

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

}