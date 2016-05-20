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
    @Input('id') id: string;
    @Input('title') title: string;
    @Input('content') content: string;
    @Input('date') date: string;
    @Input('hour') hour: string;
    @Input('type') type: string;
    @Input('subtype') subtype: string;
    @Input('newsFrom') newsFrom: string;
    constructor(){
    }

    ngOnInit(){
        this.news= new NewsModelComponent(this.id, this.title, this.content,
            this.date, this.hour, this.type, this.subtype, this.newsFrom);
        //console.log("news : "+this.currentNews.type);
        //this.news= this.currentNews;
    }

}