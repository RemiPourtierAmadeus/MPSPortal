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
        this._highlight("yellow");
    }

    onMouseLeave() {
        this._highlight(null);
    }

    private _highlight(color: string) {
        this._el.style.backgroundColor = color;
    }

}