/**
 * Component MetricsPanelComponent
 */

import {Component} from 'angular2/core';
import {ShowDescriptionDirective} from "../../../shared/directives/src/show-description.directive";
import {HideDescriptionDirective} from "../../../shared/directives/src/hide-description.directive";

@Component({
    selector: 'metrics-panel',
    moduleId: module.id,
    templateUrl: './metrics-panel.component.html',
    styleUrls : ['./metrics-panel.component.css'],
    directives: [ShowDescriptionDirective, HideDescriptionDirective]
})
export class MetricsPanelComponent { }