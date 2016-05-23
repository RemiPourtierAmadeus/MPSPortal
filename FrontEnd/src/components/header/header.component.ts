import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Input} from "angular2/core";

/**
 * Component HeaderComponent
 */

@Component({
    selector: 'header',
    moduleId: module.id,
    templateUrl: './header.component.html',
    styleUrls : ['./header.component.css'],
    directives : [
        ROUTER_DIRECTIVES
    ]
})
export class HeaderComponent {


    @Input("currentFrameValue") currentFrameValue:string;

    constructor(){}
    ngOnInit(){
        console.log("Current frame value: "+this.currentFrameValue)
    };


}