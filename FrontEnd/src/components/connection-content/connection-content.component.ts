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

    public modelForChild;
    public connectionFailed;
    public errorMessage;

    constructor(){
        this.modelForChild={errorMessage: '', errorRaised: false};
        this.connectionFailed=false;
        this.errorMessage="";
    }

    handleChildEvent(arg){}

    sendErrorMessage(message:string){
        if(message.length>0){
            this.connectionFailed=true;
            this.errorMessage=message;
        }
    }
}