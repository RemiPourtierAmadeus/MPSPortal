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
import {NewsFilterComponent} from "../news-filter/news-filter.component";

@Component({
    selector: 'news',
    moduleId: module.id,
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    directives: [NewsComponent,
        NewsFormComponent,
        NewsItemComponent,
        HeaderComponent,
        NewsFilterComponent
    ]
})
export class NewsComponent {

    newsList:NewsModelComponent[];
    subtypeValue:string;
    typeValue:string;
    newsNotFound:boolean;
    test:string;
    frameType:string;
    responseFromServer:NewsModelComponent;
    errorFromServer;

    constructor(private _manageNewsService:ManageNewsService) {
        this.test = "nope";
        this.getNews();
        this.frameType = "News";
    }

    /**
     * Function getNews.
     * This function calls the function getNews from manageNewsService in order to get back
     * all the news from the database.
     */
    getNews() {
        this._manageNewsService.getNews().then(
            news => this.newsList = news,
            error => this.noNews(error)
        );
    }

    updateOrder(news:NewsModelComponent) {
        console.log('oui je rentre dans update order');
        this.getNews();
        this.cleanListFromType(news.type);
        this.cleanListFromSubType(news.subtype);
        this.cleanListFromNewsFrom(news.newsFrom);
        this.cleanListFromStatus(news.status);
    }

    cleanListFromType(type) {
        let tmpNewList=[];
        for(let i=0;i<this.newsList.length;i++){
            if(this.newsList[i].type===type){
                tmpNewList.push(this.newsList[i]);
            }
        }
        this.newsList=tmpNewList;

    }

    cleanListFromSubType(subtype) {

    }

    cleanListFromNewsFrom(newsFrom) {

    }

    cleanListFromStatus(status) {

    }

    /**
     * Function buildNewsJSON.
     * The function builds the JSON from the news information filled in the form.
     * @returns JSON
     */
    buildNewsJSON(news) {
        let status = "";
        if (news.active) {
            status = "active";
        }
        else {
            status = "inactive";
        }
        let newsJSON = {
            title: news.title,
            content: news.content,
            type: news.type,
            subtype: news.subtype,
            newsFrom: news.newsFrom,
            state: status
        };
        return newsJSON;
    }

    /**
     * Function saveNews.
     * This function is called from the output of NewsFormComponent after news submission.
     * saveNews calls the function addNews from manageNewsService in order to add the news
     * into the database.
     * Success case: We call the verifyResponse().
     * @param news
     */
    addNews(news:NewsModelComponent) {
        let finalNewsJSON = this.buildNewsJSON(news);
        this._manageNewsService.addNews(finalNewsJSON).then(
            news => this.verifyResponse(news),
            error => this.errorFromServer = <any> error);
    }

    /**
     * Function verifyResponse.
     * This function verifies if the request succeed and updates the news list by
     * calling getNews().
     * @param news
     */
    verifyResponse(news) {
        if (news[0].success === "true") {
            this.getNews();
        }
        else {
            console.log("An error has occurred while trying to add the news");
        }
    }

    /**
     * Function saveNews.
     * It update the current news by calling the updateNews function from manageNewsService.
     * @param news
     */
    saveNews(news:NewsModelComponent) {
        let newsJSON = {
            id: news.id,
            title: news.title,
            content: news.content,
            type: news.type,
            subtype: news.subtype,
            newsFrom: news.newsFrom
        };
        this._manageNewsService.updateNews(newsJSON).then(
            news => this.verifyResponse(news),
            error => this.errorFromServer = <any> error);
    }

    /**
     * Function deleteNews.
     * Firstly, it build the JSON with the news id and then call the deleteNews function
     * from manageNewsService in order to delete it.
     * @param news
     */
    deleteNews(news:NewsModelComponent) {
        let finalNewsJSON = {
            id: news.id
        };
        this._manageNewsService.deleteNews(finalNewsJSON).then(
            news => this.verifyResponse(news),
            error => this.errorFromServer = <any> error);
    }


    /**
     * Function noNews.
     * We call this function in case of error, when no news has been found. This function create an empty new
     * to show to users.
     * @param error
     */
    noNews(error) {
        let emptyNews = new NewsModelComponent(-1, "No news found", "", "", "", "", "", "", "");
        this.newsList = [emptyNews];
        this.newsNotFound = true;
    }
}