/**
 * Component NewsItemComponent
 */

import {Component} from '@angular/core';
import {NewsModelComponent} from "../../models/news-model/news-model.component";
import {Input} from "@angular/core";
import {Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {NewsFormComponent} from "../news-form/news-form.component";
import {ManageNewsService} from "../../../shared/services/src/manage-news.service";
import {NewsConstantService} from "../../../shared/services/src/news-constant.service";

@Component({
    selector: 'news-item',
    moduleId: module.id,
    templateUrl: './news-item.component.html',
    directives: [NewsFormComponent],
    providers: [ManageNewsService,
        NewsConstantService
    ],
    styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent {

    news:NewsModelComponent;
    pageState:string;
    errorFromServer:string;
    @Input('id') id:number;
    @Input('title') title:string;
    @Input('content') content:string;
    @Input('date') date:string;
    @Input('hour') hour:string;
    @Input('type') type:string;
    @Input('subtype') subtype:string;
    @Input('newsFrom') newsFrom:string;
    @Input('state') state:string;


    typesValues:string[];
    subtypesValues:string[];
    newsFromValues:string[];
    stateValues:string[];


    @Output() newsToDelete = new EventEmitter<NewsModelComponent>();
    @Output() newsToSave = new EventEmitter<NewsModelComponent>();

    constructor(private _manageNewsService:ManageNewsService,
        private _newsConstantService:NewsConstantService) {
        this.typesValues = _newsConstantService.getTypes();
        this.subtypesValues = _newsConstantService.getSubTypes();
        this.newsFromValues = _newsConstantService.getNewsFrom();
        this.stateValues=_newsConstantService.getStatus();
        this.pageState = "general";
    }

    /**
     * Function ngOnInit.
     * NgOnInit initializes the news as newsModel and organize the constants.
     * We organize the constants for the edit part, when a user would like to edit a
     * news it will have everything pre-filled according to actual data.
     */
    ngOnInit() {
        this.news = new NewsModelComponent(this.id, this.title, this.content,
            this.date, this.hour, this.type, this.subtype, this.newsFrom, this.state);
        this.organizeConstants();
    }

    /**
     * Function organizeConstants. This function calls three functions in order to
     * organize types, subtypes and newsfrom lists.
     */
    organizeConstants() {
        this.organizeTypes();
        this.organizeSubTypes();
        this.organizeNewsFrom();
        this.organizeState();
    }

    /**
     * Function organizeState.
     * This function sorts the stateValues according to the state of the current news (received through inputs state).
     * The function puts the value of the state at the index 0 of the array.
     */
    organizeState(){
        let results=[this.news.state.charAt(0).toUpperCase()+this.news.state.slice(1).toLowerCase()];//
        for(let i =0;i< this.stateValues.length;i++){
            if(!(this.stateValues[i].toLowerCase()===this.news.state.toLowerCase())){
                results.push(this.stateValues[i].charAt(0).toUpperCase()+this.stateValues[i].slice(1).toLowerCase());
            }
        }
        this.stateValues=results;
    }

    /**
     * Function organizeTypes.
     * This function organize the type according to current news type. It puts the current type
     * at the beginning of the list in order to use it for the edit page.
     */
    organizeTypes() {
        let results=[this.news.type];
        for(let i=0;i<this.typesValues.length;i++){
            if(!(this.news.type===this.typesValues[i])){
                results.push(this.typesValues[i]);
            }
        }
        this.typesValues=results;
    }

    /**
     * Function organizeSubTypes.
     * This function organize subtypes according to current news subtype. It puts the current subtype
     * at the beginning of the list in order to use it for the edit page.
     */
    organizeSubTypes() {
        let results=[this.news.subtype];
        for(let i=0;i<this.subtypesValues.length;i++){
            if(!(this.news.subtype===this.subtypesValues[i])){
                results.push(this.subtypesValues[i]);
            }
        }
        this.subtypesValues=results;
    }

    /**
     * Function organizeNewsFrom.
     * This function organize newsFrom value according to current news newsFrom value. It puts the current newsFrom value
     * at the beginning of the list in order to use it for the edit page.
     */
    organizeNewsFrom(){
        let results=[this.news.newsFrom];
        for(let i=0;i<this.newsFromValues.length;i++){
            if(!(this.news.newsFrom===this.newsFromValues[i])){
                results.push(this.newsFromValues[i]);
            }
        }
        this.newsFromValues=results;
    }

    /**
     * The function changes the value of the page state to show the div which asks if
     * the user would like to delete the news.
     */
    openConfirmation() {
        this.pageState = "delete";
    }

    /**
     * The function changes the value of the page state to hide the div which asks if
     * the user would like to delete the news and emits the news to delete to the pattern
     * component.
     */
    deleteItem() {
        this.pageState = "general";
        this.newsToDelete.emit(this.news);
    }

    /**
     *
     */
    initializeConfirmDelete() {
        this.pageState = "general";
    }

    /**
     * Function editNews.
     * We activate the part of the page for the edition.
     */
    editNews() {
        this.pageState = "edit";
    }


    /**
     * Function cancelEditing.
     * It cancels the current edition and get back initial information.
     */
    cancelEditing(){
        this.news = new NewsModelComponent(this.id, this.title, this.content,
            this.date, this.hour, this.type, this.subtype, this.newsFrom, this.state);
        this.pageState="general";
    }

    /**
     * When the user has filled the form and clicks on the validate icon, the function sendItem
     * send the new filled news to the pattern component.
     */
    saveItem(){
        this.newsToSave.emit(this.news);
    }


}