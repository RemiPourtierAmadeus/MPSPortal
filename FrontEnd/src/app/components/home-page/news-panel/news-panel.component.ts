/**
 * Component NewsPanelComponent
 */

import {Component, EventEmitter, Output} from '@angular/core';
import {NewsItemComponent} from "../../news/news-item/news-item.component";
import {NewsModelComponent} from "../../models/news-model/news-model.component";
import {ManageNewsService} from "../../../shared/services/src/manage-news.service";
import {NewsConstantService} from "../../../shared/services/src/news-constant.service";

@Component({
    selector: 'news-panel',
    moduleId: module.id,
    templateUrl: './news-panel.component.html',
    styleUrls : ['./news-panel.component.css'],
    directives: [NewsItemComponent],
    providers:[NewsConstantService]
})
export class NewsPanelComponent {

    newsList: NewsModelComponent[];
    newsNotFound: boolean;

    @Output() pageToOpen=new EventEmitter<number>();

    constructor(private _manageNewsService: ManageNewsService, private _newsConstantService:NewsConstantService){}

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
            news => this.orderByDate(news),
            error => this.noNews(error)
        );
    }

    /**
     * Function orderByDate.
     * This function sort the news according to the date, from the most recent news to the older.
     */
    orderByDate(news){
        this.newsList=news;
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
        this.newsList=[];
        /**
         * At the end, we keep only a certain number of news (most recent). This number comes from the
         * NewsConstantService.
         */
        for(let i=0;i<this._newsConstantService.getNumberOfLastNews();i++){
            this.newsList.push(dateSorted[i]);
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

    /**
     * RedirectToNews.
     * We call this function when a user clicks on the link "Last news".
     * This function will use the output of the component in order to
     * inform the pattern component that users would like to see
     * the news page.
     */
    redirectToNews(){
        this.pageToOpen.emit(3);
    }


}