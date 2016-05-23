/**
 * Component NewsComponent
 */

import {Component} from 'angular2/core';
import {NewsFormComponent} from "../news-form/news-form.component";
import {ManageNewsService} from "../../../shared/services/src/manage-news.service";
import {NewsModelComponent} from "../../models/news-model/news-model.component";
import {NewsItemComponent} from "../news-item/news-item.component";
import {HeaderComponent} from "../../header/header.component";
import {Response} from "angular2/http";

@Component({
    selector: 'news',
    moduleId: module.id,
    templateUrl: './news.component.html',
    styleUrls : ['./news.component.css'],
    directives: [NewsComponent, NewsFormComponent, NewsItemComponent, HeaderComponent]
})
export class NewsComponent {

    newsList: NewsModelComponent[];
    subtypeValue: string;
    typeValue: string;
    newsNotFound: boolean;
    test:string;
    frameType:string;
    responseFromServer:NewsModelComponent;
    errorFromServer;

    constructor(private _manageNewsService:ManageNewsService){
        this.test="nope";
        this.getNews();
        this.frameType="News";
    }

    /**
     * Function getNews.
     * This function calls the function getNews from manageNewsService in order to get back
     * all the news from the database.
     */
    getNews(){
        console.log("oui from getNews");
        this._manageNewsService.getNews().then(
            news => this.newsList=news,
            error => this.noNews(error)
        );
    }

    /**
     * Function buildNewsJSON.
     * The function builds the JSON from the news information filled in the form.
     * @returns JSON
     */
    buildNewsJSON(news) {
        let newsJSON = {
            title: news.title,
            content: news.content,
            type: news.type,
            subtype: news.subtype,
            newsFrom: news.newsFrom
        };
        return newsJSON;
    }

    saveNews(news: NewsModelComponent){
        let finalNewsJSON = this.buildNewsJSON(news);
        this._manageNewsService.addNews(finalNewsJSON).then(
            news => this.verifyResponse(news),
            error => this.errorFromServer = <any> error);
    }

    verifyResponse(news){
        console.log("data FROM SERVER "+news[0].success);
        if(news[0].success==="true"){
            this.getNews();
        }
        else{
            console.log("An error has occured while trying to add the news");
        }
    }


    /**
     * Function noNews.
     * We call this function in case of error, when no news has been found. This function create an empty new
     * to show to users.
     * @param error
     */
    noNews(error){
        let emptyNews=new NewsModelComponent(-1,"No news found","","","","","","","");
        this.newsList=[emptyNews];
        this.newsNotFound=true;
    }
}