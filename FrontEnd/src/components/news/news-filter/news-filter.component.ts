/**
 * Component NewsFilterComponent
 */

import {Component} from 'angular2/core';
import {NewsConstantService} from "../../../shared/services/src/news-constant.service";
import {NewsModelComponent} from "../../models/news-model/news-model.component";

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

    constructor(private _newsConstantService:NewsConstantService) {
        this.typesValues = _newsConstantService.getTypes();
        this.subtypesValues = _newsConstantService.getSubTypes();
        this.newsFromValues = _newsConstantService.getNewsFrom();
        this.status= _newsConstantService.getStatus();
        this.news= new NewsModelComponent(-1,"","","","",
            this.typesValues[0],this.subtypesValues[0], this.newsFromValues[0]
            , this.status[0]);
    }
}