import {Component} from 'angular2/core';
import {MetricsComponent} from "../metrics/metrics.component";
import {PerformanceComponent} from "../performance/performance.component";
import {NewsComponent} from "../news/news.component";

@Component({
    selector: 'app',
    moduleId: module.id,
    templateUrl: './app.component.html',
    styleUrls : ['./app.component.css']
})

export class AppComponent { }