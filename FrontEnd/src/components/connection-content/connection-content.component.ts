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
    /**
     * Current page value contains the following variable: 1,2,3
     * Each number corresponds to a component:
     * 1 = Login Component
     * 2 = Forgot password Component
     * 3 = Email Address Component
     * We use it to know which is the page to display
     * IF the current page value is 0, that means we have redirect the user to
     * the home page of the application
     */
    public currentPageValue;

    constructor(){
        this.modelForChild={errorMessage: '', errorRaised: false};
        this.connectionFailed=false;
        this.errorMessage="";
        this.currentPageValue=1;
    }

    handleChildEvent(arg){}

    /**
     * Function updateCurrentPageValue.
     * This function update the variable currentPageValue.
     */
    updateCurrentPageValue(){
        if(this.currentPageValue==1 || this.currentPageValue==2){
            this.currentPageValue++;
        }
        else{
            this.currentPageValue=0;
        }
    }

    /**
     * Function sendErrorMessage.
     * We run this function while an event from logInComponent rise. This event contains
     * an error message. So we update the front-end by confirming the connection Failed and then
     * we update the error message content.
     * @param message
     */
    sendErrorMessage(message:string){
        if(message.length>0){
            this.connectionFailed=true;
            this.errorMessage=message;
        }
        else{
            this.updateCurrentPageValue();
        }
    }
}