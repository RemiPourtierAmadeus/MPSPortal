/**
 * Component MetricsPanelComponent
 */

import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'metrics-panel',
    moduleId: module.id,
    templateUrl: './metrics-panel.component.html',
    styleUrls : ['./metrics-panel.component.css']
})
export class MetricsPanelComponent {

    @Output() openMetrics=new EventEmitter<number>();

    constructor(){}

    openMetricsPage(){
        this.openMetrics.emit(4);
    }
}