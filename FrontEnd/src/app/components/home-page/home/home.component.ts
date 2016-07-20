/**
 * Component HomeComponent
 */

import {Component, EventEmitter, Output} from '@angular/core';
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

    @Output() pageToOpen=new EventEmitter<number>();

    constructor(){}

    /**
     * OpenPage is called while user requests a redirection to another page. The name of the page is
     * in parameters. If the page to open is metrics, performance or news, we emit the request to the
     * pattern component.
     * @param request
     */
    openPage(request:number){
        debugger;
        /**
         * Request value:
         * 4 -> Metrics homepage
         * 3 -> News homepage
         */
        if(request==2 || request==3){
            this.pageToOpen.emit(request);
        }
        else{
            console.log("A problem has occurred while the application tries to open metrics or performance page");
        }
    }

}