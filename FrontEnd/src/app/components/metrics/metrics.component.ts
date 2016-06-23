/**
 * Component MetricsMetricsComponent
 */

import {Component} from '@angular/core';
import {PanelComponent} from "./panel/panel.component";
import {ManageMetricsService} from "../../shared/services/src/metrics/manage-metrics.service";

@Component({
    selector: 'metrics',
    moduleId: module.id,
    templateUrl: './metrics.component.html',
    styleUrls : ['./metrics.component.css'],
    directives : [PanelComponent]
})
export class MetricsComponent {


    private metricsItem:string[];

    constructor(private _manageMetricsService:ManageMetricsService){
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
            items => this.metricsItem = items
        );
    }
}