/**
 * Test Component MetricsPanel
 */
import {MetricsPanelComponent} from "./metrics-panel.component.ts";
import {Component} from "angular2/core";
import {ShowDescriptionDirective} from "../../shared/directives/src/show-description.directive";
@Component({
    selector: 'test-metrics-panel',
    template: '<sd-metrics-panel></sd-metrics-panel>',
    directives: [ShowDescriptionDirective]
})
class TestMetricsPanelComponent {}