/**
 * Component NewsItemComponent
 */

import {Component} from 'angular2/core';
import {NewsModelComponent} from "../../models/news-model/news-model.component";
import {Input} from "angular2/core";

@Component({
    selector: 'news-item',
    moduleId: module.id,
    templateUrl: './news-item.component.html',
    styleUrls : ['./news-item.component.css']
})
export class NewsItemComponent {

    @Input('news-info') news: NewsModelComponent;
    constructor(){}

    ngOnInit(){

        console.log("news : "+this.news.type);
    }
}