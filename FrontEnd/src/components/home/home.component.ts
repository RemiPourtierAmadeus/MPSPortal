/**
 * Component HomeComponent
 */

import {Component} from 'angular2/core';
import {MetricsPanelComponent} from "../metrics-panel/metrics-panel.component";
import {PerformancePanelComponent} from "../performance-panel/performance-panel.component";
import {NewsPanelComponent} from "../news-panel/news-panel.component";
import {ShowDescriptionDirective} from "../../shared/directives/src/show-description.directive";

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls : ['./home.component.css'],
    directives: [MetricsPanelComponent, PerformancePanelComponent, NewsPanelComponent, ShowDescriptionDirective]
})
export class HomeComponent {


}