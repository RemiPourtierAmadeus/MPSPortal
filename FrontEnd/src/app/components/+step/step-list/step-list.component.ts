/**
 * Component StepStepListComponent
 */

import {Component} from '@angular/core';
import {ManageStepService} from "../../../shared/services/src/manage-step.service";
import {StepModel} from "../../models/step.model";

@Component({
    selector: 'step-list',
    moduleId: module.id,
    templateUrl: './step-list.component.html',
    styleUrls : ['./step-list.component.css'],
    providers: [ManageStepService]
})
export class StepListComponent {

    private steps:Array<StepModel>;

    /**
     * errorMessage: Attributes which stores potential error message after requesting the server
     */
    private errorMessage:string;

    /**
     * Constructor
     * @param ManageStepService
     */
    constructor(private manageStepService:ManageStepService) {
        this.steps = [];
    }

    /**
     * NgOnInit. This function is native to Angular 2. It will be executed while the component execution, just after
     * the constructor.
     */
    ngOnInit() {
        this.manageStepService.getSteps().then(
            steps =>{  this.steps = steps},
            error => this.errorMessage = <any> error
        );
    }
}