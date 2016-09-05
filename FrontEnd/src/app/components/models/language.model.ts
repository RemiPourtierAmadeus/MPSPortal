/**
 * Model for language.
 * This component contains the characteristics of a language. We use it to store languages information
 * in the front end.
 */
export class LanguageModel {

    public id:number;
    public name:string;

    constructor(id:number, name:string){
        this.id=id;
        this.name=name;
    }
}
