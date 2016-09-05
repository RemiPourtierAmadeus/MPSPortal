/**
 * Component CoreItemListComponent
 */

import {Component, Input, Output} from '@angular/core';

@Component({
    selector: 'item-list',
    moduleId: module.id,
    templateUrl: './item-list.component.html',
    styleUrls : ['./item-list.component.css']
})
export class ItemListComponent {


    @Input('content') content:string;
}