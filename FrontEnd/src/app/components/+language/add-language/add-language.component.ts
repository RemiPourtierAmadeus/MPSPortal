/**
 * Component LanguageAddLanguageComponent
 */

import {Component} from '@angular/core';
import {ProjectModel} from "../../models/project.model";

@Component({
    selector: 'add-language',
    moduleId: module.id,
    templateUrl: './add-language.component.html',
    styleUrls : ['./add-language.component.css']
})
export class AddLanguageComponent {

    private projectList:Array<ProjectModel>;

    constructor(){
        this.projectList=this.simulateYourService();
        console.log("project id: "+this.projectList[0].id);
        console.log("project name: "+this.projectList[1].id);
    }

    simulateYourService(): Array<ProjectModel>{
        let JSON={
            id: "1131",
            title: "My Tytle"
        }
        let JSON2={
            id: "1131",
            title: "My Tytle"
        }
        let res= [JSON, JSON2]
        return res;
    }

}