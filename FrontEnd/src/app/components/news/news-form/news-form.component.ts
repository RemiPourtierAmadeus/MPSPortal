/**
 * Component NewsFormComponent
 */

import {Component} from '@angular/core';
import {ManageNewsService} from "../../../shared/services/src/manage-news.service";
import {NewsModelComponent} from "../../models/news-model/news-model.component";
import {EventEmitter} from "@angular/core";
import {Output} from "@angular/core";
import {NewsConstantService} from "../../../shared/services/src/news-constant.service";

@Component({
    selector: 'news-form',
    moduleId: module.id,
    templateUrl: './news-form.component.html',
    providers: [
        NewsConstantService
    ],
    styleUrls : ['./news-form.component.css']
})
export class NewsFormComponent {

    news:NewsModelComponent;
    typesValue:string[];
    subtypesValue:string[];
    newsFrom:string[];
    formCorrectlyFilled:boolean;
    status:string[];
    showForm:boolean;

    @Output() sendNews= new EventEmitter<NewsModelComponent>();

    /**
     * Constructor.
     * We initialize a newsModel in order to use it in the form. When a user fills the form, we save directly
     * those changes in the newsModel.
     * We also initialize content of the form: types, subtypes and newsFrom.
     */
    constructor(private _newsConstantService:NewsConstantService){
        this.news= new NewsModelComponent(-1, "", "", "", "", "Info", "Reports", "Metrics", "inactive");
        this.typesValue=_newsConstantService.getTypes();
        this.subtypesValue= _newsConstantService.getSubTypes();
        this.newsFrom=_newsConstantService.getNewsFrom();
        this.status=_newsConstantService.getStatus();
        this.showForm=true;
    }

    hideShowForm(){
        this.showForm=!this.showForm;
    }

    /**
     * Function formComplete.
     * The function verifies if the form has been correctly filled. It returns true if yes, else false.
     * @returns {boolean}
     */
    formComplete() {
        console.log("inactive: "+this.news.state);
        if (this.news.state==="Inactive") {
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
            this.news= new NewsModelComponent(-1, "", "", "", "", "Info", "Reports", "Metrics", "Inactive");

        }
    }

}