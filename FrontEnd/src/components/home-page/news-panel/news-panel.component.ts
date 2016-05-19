/**
 * Component NewsPanelComponent
 */

import {Component} from 'angular2/core';
import {NewsItemComponent} from "../news-item/news-item.component";
import {NewsModelComponent} from "../news-model/news-model.component";
import {ShowDescriptionDirective} from "../../../shared/directives/src/show-description.directive";

@Component({
    selector: 'news-panel',
    moduleId: module.id,
    templateUrl: './news-panel.component.html',
    styleUrls : ['./news-panel.component.css'],
    directives: [ShowDescriptionDirective, NewsItemComponent]
})
export class NewsPanelComponent {

    private newsList: NewsModelComponent[];
    constructor(){}

}