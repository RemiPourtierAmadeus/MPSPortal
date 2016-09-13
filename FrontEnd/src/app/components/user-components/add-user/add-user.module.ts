import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AddUserComponent],
    exports: [AddUserComponent]
})

export class AddUserModule { }