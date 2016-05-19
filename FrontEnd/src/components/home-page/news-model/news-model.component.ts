/**
 * Component NewsModelComponent
 */

import {Component} from 'angular2/core';

@Component({
    selector: 'news-model',
    moduleId: module.id,
    templateUrl: './news-model.component.html',
    styleUrls : ['./news-model.component.css']
})
export class NewsModelComponent {

    constructor(
        public title:string,
        public date:string,
        public hour:string,
        public type:string[]
    ){}
}