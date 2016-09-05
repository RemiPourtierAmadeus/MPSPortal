/**
 * Component NewsComponent
 */

import {Component, EventEmitter, Output} from '@angular/core';
import {Response} from "@angular/http";
import {NewsFormComponent} from "../news-form/news-form.component";
import {ManageNewsService} from "../../../shared/services/src/manage-news.service";
import {NewsModelComponent} from "../../models/news-model/news-model.component";
import {NewsItemComponent} from "../news-item/news-item.component";
import {HeaderComponent} from "../../header/header.component";
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
    tmpNewsList:NewsModelComponent[];
    typeValue:string;
    newsNotFound:boolean;
    frameType:string;
    errorFromServer;

    @Output() pageToOpen= new EventEmitter<number>();

    constructor(private _manageNewsService:ManageNewsService) {
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
            news => {this.newsList = news;this.orderByDate();},
            error => this.noNews(error)
        );
    }


    /**
     * Function updateOrder.
     * This function is the first step to change the news list.
     * First we get back the latest news from the server and then call the
     * function updateLists to change the news list according user choices.
     * @param newsFromFilter
     */
    updateOrder(newsFromFilter:NewsModelComponent) {
        this._manageNewsService.getNews().then(
            news => this.updateLists(news, newsFromFilter),
            error => this.noNews(error)
        );

    }

    /**
     * Function updateLists.
     * This function calls a function for each filter.
     * We clean the news list according to: type, subtype, newsFrom and state.
     * At the end, if the news list is empty (no news according to filters), we
     * create an empty news.
     * @param news
     * @param newsFromFilter
     */
    updateLists(news:NewsModelComponent[], newsFromFilter){
        this.newsList=news;
        this.tmpNewsList= news;//<NewsModelComponent>[];

         if(!(newsFromFilter.type==="All types")){
            this.cleanListFromType(newsFromFilter.type);
        }
        if(!(newsFromFilter.subtype==="All subtypes")){
            this.cleanListFromSubType(newsFromFilter.subtype);
        }
        if(!(newsFromFilter.newsFrom==="Global")){
            this.cleanListFromNewsFrom(newsFromFilter.newsFrom);
        }
        if(!(newsFromFilter.state==="All")){
            this.cleanListFromStatus(newsFromFilter.state);
        }

        if(this.newsList.length==0){
            let emptyNews=new NewsModelComponent(-1,"No news found","","--","--:--","","","Global","");
            this.newsList.push(emptyNews);
        }

        this.orderByDate();
    }

    /**
     * Function orderByDate.
     * This function sort the news according to the date, from the most recent news to the older.
     */
    orderByDate(){
        let dateSorted=[];
        dateSorted.push(this.newsList[0]);
        let diff=0;
        for(let i=1;i<this.newsList.length;i++){
            for(let j=0;j<dateSorted.length;j++){
                diff=this.newsList[i].date.localeCompare(dateSorted[j].date);
                if(diff==-1|| diff==0){
                    dateSorted.splice(j,0,this.newsList[i]);
                    j=dateSorted.length;
                }
                if(j+1==dateSorted.length){
                    dateSorted.push(this.newsList[i]);
                    j=dateSorted.length;
                }
            }
        }
        dateSorted.reverse();
        this.newsList=dateSorted;
    }


    /**
     * Function deleteNewsInList.
     * This function removes an element of the list according to its index.
     * @param list
     * @param index
     * @returns {Array}
     */
    deleteNewsInList(list,index){
        let res=[];
        for(let i=0;i<list.length;i++){
            if(i!=index){
                res.push(list[i]);
            }
        }
        return res;
    }

    /**
     * Function cleanListFromType.
     * This function removes all the news which don't have same type as
     * the one selected by user.
     * @param type
     */
    cleanListFromType(type) {
        for(let i=0;i<this.newsList.length;i++){
            if(!(this.newsList[i].type===type)){
                this.newsList=this.deleteNewsInList(this.newsList,i);
                i=i-1;
            }
        }
    }

    /**
     * Function cleanListFromSubType.
     * This function removes all the news which don't have same subtype as
     * the one selected by user.
     * @param subtype
     */
    cleanListFromSubType(subtype) {
        for(let i=0;i<this.newsList.length;i++){
            if(!(this.newsList[i].subtype===subtype)){
                this.newsList=this.deleteNewsInList(this.newsList,i);
                i=i-1;
            }
        }
    }

    /**
     * Function cleanListFromNewsFrom.
     * This function removes all the news which don't have same newsFrom (Metrics or Performance) as
     * the one selected by user.
     * @param newsFrom
     */
    cleanListFromNewsFrom(newsFrom) {
        for(let i=0;i<this.newsList.length;i++){
            if(!(this.newsList[i].newsFrom===newsFrom)){
                this.newsList=this.deleteNewsInList(this.newsList,i);
                i=i-1;
            }
        }
    }

    /**
     * Function cleanListFromStatus.
     * This function removes all the news which don't have same state as
     * the one selected by user.
     * @param state
     */
    cleanListFromStatus(state) {
        for(let i=0;i<this.newsList.length;i++){
            if(!(this.newsList[i].state.toLowerCase()===state.toLowerCase())){
                this.newsList=this.deleteNewsInList(this.newsList,i);
                i=i-1;
            }
        }
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
            newsFrom: news.newsFrom,
            state: news.state
        };
        this._manageNewsService.updateNews(newsJSON).then(
            news => this.verifyResponse(news), //or if you would like to get directly the response you can
                                                // do this.myVariable=news;
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
     * Function deleteNews.
     * Firstly, it build the JSON with the news id and then call the deleteNews function
     * from manageNewsService in order to delete it.
     * @param news
     */
    deleteNews(news:NewsModelComponent) {
        let finalNewsJSON = {
            id: news.id
        };
        //TODO: TO UNCOMMENT WHEN THE BUG WITH DELETENEWS WILL BE FIXED

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


    openPage(pageValue:number){
        this.pageToOpen.emit(pageValue);
    }
}