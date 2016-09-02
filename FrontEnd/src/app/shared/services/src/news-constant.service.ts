/**
 * Service NewsConstantService
 */
import {Injectable} from '@angular/core';

@Injectable()
export class NewsConstantService {

    private typesValue:string[];
    private subtypesValue:string[];
    private newsFrom:string[];
    private status:string[];
    private numberOfLastNews:number;

    /**
     * In the constructor we initialize the attributes.
     */
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
            "Global",
            "Metrics",
            "Performance"
        ];
        this.status = [
            "active",
            "inactive"
        ];
        this.numberOfLastNews=3;
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

    /**
     * Get the number of last news.
     * @returns {number}
     */
    getNumberOfLastNews(){
        return this.numberOfLastNews;
    }
}