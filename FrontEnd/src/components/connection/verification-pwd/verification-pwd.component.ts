/**
 * Component VerificationPwdComponent
 */

import {Component} from 'angular2/core';

@Component({
    selector: 'verification-pwd',
    moduleId: module.id,
    templateUrl: './verification-pwd.component.html',
    styleUrls : ['./verification-pwd.component.css']
})
export class VerificationPwdComponent {

    private firstPwd;
    private secondPwd;

    constructor(password1, password2){
        this.firstPwd=password1;
        this.secondPwd=password2;
    }

    verifyPwd(){
        if(this.firstPwd!=="" && this.secondPwd!==""
            && this.firstPwd===this.secondPwd) return true;
        return false;
    }
}