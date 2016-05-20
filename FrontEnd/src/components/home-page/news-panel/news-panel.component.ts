/**
 * Component NewsPanelComponent
 */

import {Component} from 'angular2/core';
import {NewsItemComponent} from "../../news/news-item/news-item.component";
import {NewsModelComponent} from "../../models/news-model/news-model.component";
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
    newsNotFound: boolean;

    constructor(private _manageNewsService: ManageNewsService){}

    ngOnInit(){
        this.newsNotFound=false;
        this.getNews();
    }

    /**
     * Function getNews.
     * This function get back the news from the server.
     * Two cases:
     * Success: we initialise our news list with data from service
     * Failure: we call noNews function.
     */
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
     */
    noNews(error){
        let emptyNews=new NewsModelComponent(-1,"No news found","","","","","","","");
        this.newsList=[emptyNews];
        this.newsNotFound=true;

    }

    redirectToSpecificNews(id){
        console.log("iep l'id c'est: "+ id);
    }

}