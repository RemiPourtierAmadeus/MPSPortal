/**
 * Component MetricsPanelComponent
 */

import {Component, Input, EventEmitter, Output} from '@angular/core';
import {} from '../../../../assets/metrics/'
@Component({
    selector: 'm-panel',
    moduleId: module.id,
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.css']
})
export class PanelComponent {

    @Input('name') name:string;
    @Input('pathImage') pathImage:string;
    @Input('color') color:string;
    @Input('description') description:string;
    @Input('icon') icon:string;


    @Output() openLink = new EventEmitter<number>();

    private showDescription:boolean;

    constructor() {
        this.name = "";
        this.pathImage = "";
        this.color = "";
        this.description = "";
        this.icon = "";

        this.showDescription = false;
    }

    openDescription() {
        this.showDescription = !this.showDescription;
    }

    /**
     *
     */
    clicked() {
        let pageValue = -1;
        switch (this.name) {
            case "News":
                pageValue = 3;
                break;
            case "Settings":
                pageValue = 2;
                break;
            case "Projects & Sessions":
                pageValue = -1;
                break;
            case "Statistics":
                pageValue = -1;
                break;
        }
        this.openLink.emit(pageValue);
    }

}