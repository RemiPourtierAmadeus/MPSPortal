import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Input} from "@angular/core";

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


    private menuIsClosed:boolean;

    @Input("currentFrameValue") currentFrameValue:string;

    constructor(){
        this.menuIsClosed=true;
    }

    ngOnInit(){
        console.log("Current frame value: "+this.currentFrameValue)
    };

    showHideMenu(){
        this.menuIsClosed=!this.menuIsClosed;
    }

}