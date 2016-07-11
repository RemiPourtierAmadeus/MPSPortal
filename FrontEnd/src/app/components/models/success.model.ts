/**
 * Model for success.
 * This component contains the characteristics of a success. We use it for certain feedback from the database.
 * When an operation has been done like adding a language, the database gets back the result of the operation by
 * success: true or false
 */
export class SuccessModel {

    public success:string;

    constructor(success:string){
        this.success=success;
    }
}
