/**
 * Model for step.
 * This component contains the characteristics of a step. We use it to store steps information
 * in the front end.
 */
export class StepModel {

    public id:number;
    public orderStep:string;
    public name:string;

    constructor(id:number, orderStep:string, name:string){
        this.id=id;
        this.orderStep=orderStep;
        this.name=name;
    }
}
