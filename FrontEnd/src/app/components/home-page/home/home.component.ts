/**
 * Component HomeComponent
 */

import {Component} from '@angular/core';
import {MetricsPanelComponent} from "../metrics-panel/metrics-panel.component";
import {PerformancePanelComponent} from "../performance-panel/performance-panel.component";
import {NewsPanelComponent} from "../news-panel/news-panel.component";
import {ManageNewsService} from "../../../shared/services/src/manage-news.service";
import {ManageUsersService} from "../../../shared/services/src/manage-users.service";

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls : ['./home.component.css'],
    providers : [ManageNewsService],
    directives: [MetricsPanelComponent,
        PerformancePanelComponent,
        NewsPanelComponent]
})
export class HomeComponent {


}