/**
 * Component NewsPanelComponent
 */

import {Component} from 'angular2/core';
import {NewsItemComponent} from "../news-item/news-item.component";
import {NewsModelComponent} from "../news-model/news-model.component";
import {ShowDescriptionDirective} from "../../../shared/directives/src/show-description.directive";
import {ManageNewsService} from "../../../shared/services/src/manage-news.service";

@Component({
    selector: 'news-panel',
    moduleId: module.id,
    templateUrl: './news-panel.component.html',
    styleUrls : ['./news-panel.component.css'],
    directives: [ShowDescriptionDirective, NewsItemComponent]
})
export class NewsPanelComponent {

    newsList: NewsModelComponent[];
    typeList: number[];
    newsNotFound: boolean;
    private errorMessage: string;

    constructor(private _manageNewsService: ManageNewsService){}

    ngOnInit(){
        this.newsNotFound=false;
        this.getNews();
    }

    /**
     * Function getNews.
     * This function get back the news from the server.
     */
    getNews(){
        this._manageNewsService.getNews().then(
            news => this.initialiseVariable(news),
            error => this.noNews(error)
        );
    }

    initialiseVariable(news){
        this.newsList=news;
        console.log("news list length: "+news);
        this.typeList=[];
        for(let i=0;i<this.newsList.length;i++){
            switch (this.newsList[i].type){
                case "Info":
                    this.typeList[i]=0;
                    break;
                case "Infrastructure":
                    this.typeList[i]=1;
                    break;
                case "Process":
                    this.typeList[i]=2;
                    break;
            }
        }
    }

    noNews(error){
        let emptyNews=new NewsModelComponent(-1,"No news found","","","","","","","");
        this.newsList=[emptyNews];
        this.newsNotFound=true;

    }

}