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
    formCorrectlyFilled:boolean;

    @Output() sendNews= new EventEmitter<NewsModelComponent>();

    /**
     * Constructor.
     * We initialize a newsModel in order to use it in the form. When a user fills the form, we save directly
     * those changes in the newsModel.
     * We also initialize content of the form: types, subtypes and newsFrom.
     */
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
            "Events"];
        this.newsFrom=[
            "Metrics",
            "Performance",
            "Global"
        ]
    }

    /**
     * Function formComplete.
     * The function verifies if the form has been correctly filled. It returns true if yes, else false.
     * @returns {boolean}
     */
    formComplete() {
        console.log('oui je rentre: ');
        console.log("active: "+this.news.active);
        console.log("inactive: "+this.news.inactive);
        if (!this.news.active && !this.news.inactive) {
            this.formCorrectlyFilled = false;
            return false;
        }
        return true;
    }


    /**
     * Function onSubmit.
     * We call this function when the user clicks on submit.
     * We verify if the form has been correctly filled and then we send the news to
     * the pattern component.
     */
    onSubmit(){
        if(this.formComplete()){
            this.sendNews.emit(this.news);
        }
    }

}