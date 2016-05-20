/**
 * Component NewsComponent
 */

import {Component} from 'angular2/core';
import {NewsFormComponent} from "../../news-form/news-form.component";
import {ManageNewsService} from "../../../shared/services/src/manage-news.service";
import {NewsModelComponent} from "../../models/news-model/news-model.component";
import {NewsItemComponent} from "../news-item/news-item.component";

@Component({
    selector: 'news',
    moduleId: module.id,
    templateUrl: './news.component.html',
    styleUrls : ['./news.component.css'],
    directives: [NewsComponent, NewsFormComponent, NewsItemComponent]
})
export class NewsComponent {

    newsList: NewsModelComponent[];
    subtypeValue: string;
    typeValue: string;
    newsNotFound: boolean;
    test:string;

    constructor(private _manageNewsService:ManageNewsService){
        this.test="nope";
        this.getNews();
    }

    ngOnInit(){
    }

    getNews(){
        this._manageNewsService.getNews().then(
            news => this.newsList=news,
            error => this.noNews(error)
        );
    }

    /**
     * Function noNews.
     * We call this function in case of error, when no news has been found. This function create an empty new
     * to show to users.
     * @param error
 6    */
    noNews(error){
        let emptyNews=new NewsModelComponent(-1,"No news found","","","","","","","");
        this.newsList=[emptyNews];
        this.newsNotFound=true;
    }
}