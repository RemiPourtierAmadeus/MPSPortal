/**
 * Directive ShowDescriptionDirective
 */
import {Directive, ElementRef, Input} from 'angular2/core';
@Directive({
    selector: '[showDescription]'
})
export class ShowDescriptionDirective {
    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }
}