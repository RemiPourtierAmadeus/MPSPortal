/**
 * Service ManageMetricsService
 */
import {Injectable} from '@angular/core';
import {METRICSITEM} from "../../../mocks/mock-metrics";

@Injectable()
export class ManageMetricsService {

    public metricsItem:string[];

    getMetricsItem(){
        return Promise.resolve(METRICSITEM);
    }
}