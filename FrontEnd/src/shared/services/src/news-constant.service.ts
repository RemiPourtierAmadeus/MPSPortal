/**
 * Service NewsConstantService
 */
import {Injectable} from 'angular2/core';

@Injectable()
export class NewsConstantService {

    private typesValue:string[];
    private subtypesValue:string[];
    private newsFrom:string[];
    private status:string[];


    constructor() {
        this.typesValue = [
            "Info",
            "Infrastructure",
            "Process"];
        this.subtypesValue = [
            "Reports",
            "Outage",
            "Language",
            "Planning",
            "Events"];
        this.newsFrom = [
            "Metrics",
            "Performance",
            "Global"
        ];
        this.status = [
            "Active",
            "Inactive"
        ];
    }

    /**
     * Get the type list
     * @returns {string[]}
     */
    getTypes() {
        return this.typesValue;
    }

    /**
     * Get the subtype list
     * @returns {string[]}
     */
    getSubTypes() {
        return this.subtypesValue;
    }

    /**
     * Get the newsFrom list
     * @returns {string[]}
     */
    getNewsFrom() {
        return this.newsFrom;
    }

    /**
     * Get the status list
     * @returns {string[]}
     */
    getStatus() {
        return this.status;
    }
}