/**
 * Component NewsFormComponent
 */

import {Component} from 'angular2/core';
import {ManageNewsService} from "../../../shared/services/src/manage-news.service";
import {NewsComponent} from "../news/news.component";
import {NewsModelComponent} from "../../models/news-model/news-model.component";
import {EventEmitter} from "angular2/core";
import {Output} from "angular2/core";

@Component({
    selector: 'news-form',
    moduleId: module.id,
    templateUrl: './news-form.component.html',
    styleUrls : ['./news-form.component.css']
})
export class NewsFormComponent {

    news:NewsModelComponent;
    typesValue:string[];
    subtypesValue:string[];
    newsFrom:string[];

    @Output() sendNews= new EventEmitter<NewsModelComponent>();

    constructor(){
        this.news= new NewsModelComponent(-1, "", "", "", "", "Info", "Reports", "Metrics", false,false);
        this.typesValue=[
            "Info",
            "Infrastructure",
            "Process"];
        this.subtypesValue=[
            "Reports",
            "Outage",
            "Language",
            "Planning",
            "Communications/Events"];
        this.newsFrom=[
            "Metrics",
            "Performance",
            "Global"
        ]
    }

    onSubmit(){
        this.sendNews.emit(this.news);
    }

}