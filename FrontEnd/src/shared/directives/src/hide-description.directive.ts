/**
 * Directive HideDescriptionDirective
 */
import {Directive, ElementRef, Input} from 'angular2/core';
@Directive({
    selector: '[hideDescription]',
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})
export class HideDescriptionDirective {
    private _el:HTMLElement;

    constructor(el: ElementRef) {
        this._el = el.nativeElement;
    }

    onMouseEnter() {
        this._highlight("block");
    }

    onMouseLeave() {
        this._highlight("none");
    }

    private _highlight(typeOfDisplay: string) {
        this._el.style.display = typeOfDisplay;
    }
}