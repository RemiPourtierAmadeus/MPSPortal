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

}