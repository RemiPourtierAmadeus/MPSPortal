/**
 * Model for project.
 * This component contains the characteristics of a news. We use it to store news information
 * in the front end.
 */
export class ProjectModel {

    public id:number;
    public title:string;

    constructor(id:number, title:string){
        this.id=id;
        this.title=title;
    }
}
