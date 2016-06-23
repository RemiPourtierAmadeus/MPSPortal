/**
 * Component MetricsPanelComponent
 */

import {Component, Input} from '@angular/core';

@Component({
    selector: 'm-panel',
    moduleId: module.id,
    templateUrl: './panel.component.html',
    styleUrls : ['./panel.component.css']
})
export class PanelComponent {

    @Input('name') name:string;
    @Input('pathImage') pathImage:string;
    @Input('color') color:string;
    
    constructor(){
        this.name="";
        this.pathImage="";
        this.color="";
    }

}