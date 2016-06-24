/**
 * Component MetricsPanelComponent
 */

import {Component, Input} from '@angular/core';
import {} from '../../../../assets/metrics/'
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
    @Input('description') description:string;

    private showDescription:boolean;
    
    constructor(){
        this.name="";
        this.pathImage="";
        this.color="";

        this.showDescription=false;
    }

    openDescription(){
        console.log('hey');
        this.showDescription=!this.showDescription;
    }

}