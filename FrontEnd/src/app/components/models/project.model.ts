/**
 * Model for project.
 * This component contains the characteristics of a project. We use it to store projects information
 * in the front end.
 */
export class ProjectModel {

    public id:number;
    public name:string;
    public version:string;
    public step_id_list:string;
    public language_id:string;
    public order:number;
    public name:string;
    public name:string;

    public steps:Array<number>;

    constructor(id:number, name:string, version:string){
        this.id=id;
        this.name=name;

        this.convertStepsIdList();
    }


    convertStepsIdList(){
        if(this.step_id_list.length>0){

        }
    }
}
