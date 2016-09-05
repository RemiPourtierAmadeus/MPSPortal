/**
 * Component CoreShowHideButtonComponent
 */

import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'show-hide-button',
    moduleId: module.id,
    templateUrl: './show-hide-button.component.html',
    styleUrls: ['./show-hide-button.component.css']
})
export class ShowHideButtonComponent {

    showForm:boolean;
    @Output() sendShowHide = new EventEmitter<boolean>();

    /**
     * Constructor.
     */
    constructor() {
        this.showForm = false;
    }

    /**
     * The function hideShowForm changes the attribute value of showForm and send it as output
     */
    hideShowForm() {
        this.showForm = !this.showForm;
        this.sendShowHide.emit(this.showForm);
    }

}