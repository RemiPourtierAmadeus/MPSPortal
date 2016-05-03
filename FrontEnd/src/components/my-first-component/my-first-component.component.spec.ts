/**
 * Test Component MyFirstComponent
 */
import {MyFirstComponentComponent} from "./my-first-component.component";
import {Component} from "angular2/core";
@Component({
    selector: 'test-my-first-component',
    template: '<sd-my-first-component></sd-my-first-component>',
    directives: []
})
class TestMyFirstComponentComponent {}