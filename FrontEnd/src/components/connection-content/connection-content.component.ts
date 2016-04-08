/**
 * Component ConnectionContentComponent
 */

import {Component} from 'angular2/core';
import {LogInComponent} from "../log-in/log-in.component";

@Component({
    selector: 'connection-content',
    moduleId: module.id,
    templateUrl: './connection-content.component.html',
    styleUrls : ['./connection-content.component.css'],
    directives: [LogInComponent]
})
export class ConnectionContentComponent {

    public errorMessage;
    public errorRaised;
    public submitted;
    public connectionFailed;

    constructor(){
        this.submitted=false;
        this.connectionFailed=false;
        this.errorMessage="";
        this.errorRaised=false;
    }

}