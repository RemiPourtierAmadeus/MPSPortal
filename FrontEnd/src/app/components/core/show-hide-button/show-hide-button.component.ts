/**
 * Component CoreShowHideButtonComponent
 */

import {Component, Output, EventEmitter} from '@angular/core';
import {NewsModelComponent} from "../../../../../dist/template/app/components/models/news-model/news-model.component";

@Component({
    selector: 'show-hide-button',
    moduleId: module.id,
    templateUrl: './show-hide-button.component.html',
    styleUrls : ['./show-hide-button.component.css']
})
export class ShowHideButtonComponent {


    showForm:boolean;
    @Output() sendShowHide = new EventEmitter<boolean>();

    /**
     * Constructor.
     */
    constructor(){
        this.showForm=true;
    }

    hideShowForm(){
        this.showForm=!this.showForm;
       //this.sendShowHide.emit(this.showForm);
    }

}