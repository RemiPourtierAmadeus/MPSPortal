/**
 * Test Component NewsItem
 */
import {NewsItemComponent} from "./news-item.component.ts";
import {Component} from "angular2/core";
@Component({
    selector: 'test-news-item',
    template: '<sd-news-item></sd-news-item>',
    directives: []
})
class TestNewsItemComponent {}