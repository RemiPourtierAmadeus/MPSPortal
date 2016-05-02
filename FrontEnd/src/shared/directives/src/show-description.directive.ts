/**
 * Directive ShowDescriptionDirective
 */
import {Directive, ElementRef, Input} from 'angular2/core';
@Directive({
    selector: '[showDescription]',
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})
export class ShowDescriptionDirective {
    private _el:HTMLElement;

    constructor(el: ElementRef) {
        this._el = el.nativeElement;
    }

    onMouseEnter() {
        this._highlight("none");
    }

    onMouseLeave() {
        this._highlight("block");
    }

    private _highlight(typeOfDisplay: string) {
        this._el.style.display = typeOfDisplay;
    }

}