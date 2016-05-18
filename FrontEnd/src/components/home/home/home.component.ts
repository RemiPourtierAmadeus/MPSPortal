/**
 * Component HomeComponent
 */

import {Component} from 'angular2/core';
import {MetricsPanelComponent} from "../metrics-panel/metrics-panel.component.ts";
import {PerformancePanelComponent} from "../performance-panel/performance-panel.component.ts";
import {NewsPanelComponent} from "../news-panel/news-panel.component.ts";
import {ShowDescriptionDirective} from "../../../shared/directives/src/show-description.directive.ts";

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls : ['./home.component.css'],
    directives: [MetricsPanelComponent, PerformancePanelComponent, NewsPanelComponent, ShowDescriptionDirective]
})
export class HomeComponent {


}