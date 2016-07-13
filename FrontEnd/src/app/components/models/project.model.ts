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
    public language_id:number;
    public order:number;
    public jenkins_link:string;
    public active:string;

    public steps:Array<number>;

    constructor(id:number, name:string, version:string, step_id_list:string,
                language_id:number, order:number, jenkins_link:string, active:string){
        this.id=id;
        this.name=name;
        this.version=version;
        this.step_id_list=step_id_list;
        this.language_id=language_id;
        this.order=order;
        this.jenkins_link=jenkins_link;
        this.active=active;
        this.convertStepsIdList();
    }


    convertStepsIdList(){
        if(this.step_id_list.length>0){

        }
    }
}
