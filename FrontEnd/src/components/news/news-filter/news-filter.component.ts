/**
 * Component NewsFilterComponent
 */

import {Component} from 'angular2/core';
import {NewsConstantService} from "../../../shared/services/src/news-constant.service";
import {NewsModelComponent} from "../../models/news-model/news-model.component";
import {EventEmitter} from "angular2/core";
import {Output} from "angular2/core";

@Component({
    selector: 'news-filter',
    moduleId: module.id,
    templateUrl: './news-filter.component.html',
    styleUrls : ['./news-filter.component.css'],
    providers: [NewsConstantService]
})
export class NewsFilterComponent {

    private typesValues:string[];
    private subtypesValues:string[];
    private newsFromValues:string[];
    private status:string[];

    private news: NewsModelComponent;

    @Output() orderBy= new EventEmitter<NewsModelComponent>();

    constructor(private _newsConstantService:NewsConstantService) {
        this.typesValues = _newsConstantService.getTypes();
        this.subtypesValues = _newsConstantService.getSubTypes();
        this.newsFromValues = _newsConstantService.getNewsFrom();
        this.status= _newsConstantService.getStatus();
        this.organizeData();
        this.news= new NewsModelComponent(-1,"","","","",
            this.typesValues[0],this.subtypesValues[0], this.newsFromValues[0]
            , this.status[0]);
    }

    /**
     * Function organizeData.
     * As default, we would like to show all the news, so we put
     * for the type and subtype general value which says "We want to see all the type
     * and subtypes". We change the order of the typesValues and subtypesValues
     * to achieve this goal.
     */
    organizeData(){
        let tmp="";
        //this.typesValues.push("All types");
        tmp=this.typesValues[0];
        this.typesValues[0]="All types";
        this.typesValues.push(tmp);

        //this.subtypesValues.push("All subtypes");
        tmp=this.subtypesValues[0];
        this.subtypesValues[0]="All subtypes";
        this.subtypesValues.push(tmp);

    }

    onSubmit(){
        this.orderBy.emit(this.news);
    }

}