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

    news: NewsModelComponent;
    @Input('news-info') currentNews: NewsModelComponent;
    @Input('test') test: string;
    constructor(){
    }

    ngOnInit(){
        console.log("news : "+this.currentNews.type);
        this.news= this.currentNews;
    }

}