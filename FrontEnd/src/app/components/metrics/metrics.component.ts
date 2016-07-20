/**
 * Component MetricsMetricsComponent
 */

import {Component, Output, EventEmitter} from '@angular/core';
import {PanelComponent} from "./panel/panel.component";
import {ManageMetricsService} from "../../shared/services/src/metrics/manage-metrics.service";

@Component({
    selector: 'metrics',
    moduleId: module.id,
    templateUrl: './metrics.component.html',
    styleUrls : ['./metrics.component.css'],
    directives : [PanelComponent],
    providers: [ManageMetricsService]
})
export class MetricsComponent {


    private metricsItem:string[];
    private metricsItemRow1:string[];
    private metricsItemRow2:string[];


    @Output() pageToOpen = new EventEmitter<number>();

    constructor(private _manageMetricsService:ManageMetricsService){
        this.metricsItem=[];
        this.metricsItemRow1=[];
        this.metricsItemRow2=[];
    }

    /**
     * Function ngOnInit.
     * This function is native with Angular 2. It will be automatically executed
     * just after the construction of every components of the page.
     * In the function, we need to initialize the list of metrics item. For security
     * measure, we wait for construction before calling the function getMetricsItem.
     */
    ngOnInit(){
        this._manageMetricsService.getMetricsItem().then(
            items => this.splitMetricsItemAccordingToRow(items)
        );
    }

    splitMetricsItemAccordingToRow(items:string[]){
        this.metricsItem = items;
        this.metricsItemRow1.push(items[0]);
        this.metricsItemRow1.push(items[1]);
        this.metricsItemRow2.push(items[2]);
        this.metricsItemRow2.push(items[3]);
    }

    openPage(pageValue:number){
        console.log("oui aussi: "+pageValue);
        this.pageToOpen.emit(pageValue);
    }

}