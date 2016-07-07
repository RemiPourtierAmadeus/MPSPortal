/**
 * Component LanguageAddLanguageComponent
 */

import {Component} from '@angular/core';
import {ProjectModel} from "../../models/project.model";

@Component({
    selector: 'add-language',
    moduleId: module.id,
    templateUrl: './add-language.component.html',
    styleUrls : ['./add-language.component.css']
})
export class AddLanguageComponent {

    private descriptionClass:string;

    constructor(){
        this.descriptionClass = "large-10";
    }

}