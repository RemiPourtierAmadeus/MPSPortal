/**
 * Test Component NewsItem
 */
import {NewsItemComponent} from "./news-item.component.ts";
import {Component} from "@angular/core";
@Component({
    selector: 'test-news-item',
    template: '<sd-news-item></sd-news-item>',
    directives: []
})
class TestNewsItemComponent {}