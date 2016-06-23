/**
 * Component MetricsMetricsComponent
 */

import {Component} from '@angular/core';
import {PanelComponent} from "./panel/panel.component";

@Component({
    selector: 'metrics',
    moduleId: module.id,
    templateUrl: './metrics.component.html',
    styleUrls : ['./metrics.component.css'],
    directives : [PanelComponent]
})
export class MetricsComponent {


}