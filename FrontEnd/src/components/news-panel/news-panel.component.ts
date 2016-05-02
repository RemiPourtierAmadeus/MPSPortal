/**
 * Component NewsPanelComponent
 */

import {Component} from 'angular2/core';
import {ShowDescriptionDirective} from "../../shared/directives/src/show-description.directive";

@Component({
    selector: 'news-panel',
    moduleId: module.id,
    templateUrl: './news-panel.component.html',
    styleUrls : ['./news-panel.component.css'],
    directives: [ShowDescriptionDirective]
})
export class NewsPanelComponent { }