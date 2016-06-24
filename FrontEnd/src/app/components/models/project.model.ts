/**
 * Model for project.
 * This component contains the characteristics of a news. We use it to store news information
 * in the front end.
 */
export class ProjectModel {

    constructor(
        public id:number,
        public title:string,
        public content:string,
        public date:string,
        public hour:string,
        public type:string,
        public subtype:string,
        public newsFrom:string,
        public state:string
    ){}
}
