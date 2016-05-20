/**
 * Component NewsFormComponent
 */

import {Component} from 'angular2/core';
import {ManageNewsService} from "../../../shared/services/src/manage-news.service";
import {NewsComponent} from "../news/news.component";
import {NewsModelComponent} from "../../models/news-model/news-model.component";

@Component({
    selector: 'news-form',
    moduleId: module.id,
    templateUrl: './news-form.component.html',
    styleUrls : ['./news-form.component.css']
})
export class NewsFormComponent {

    news:NewsModelComponent;

    constructor(private _manageNewsService:ManageNewsService){
        this.news= new NewsModelComponent(-1, "", "", "", "", "", "", "");
    }

    onSubmit(){
        console.log("Hello from on Submit");
    }
}