
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import {LanguageComponent} from "./components/+language/language.component";
import {AddUserComponent} from "./components/user-components/add-user/index";
import {UserListComponent} from "./components/user-components/user-list/user-list.component";
import {EditUserComponent} from "./components/user-components/edit-user/edit-user.component";

const appRoutes: Routes = [
    ...LanguageComponent,
    ...AddUserComponent,
    ...UserListComponent,
    ...EditUserComponent,
    ...LanguageComponent,
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);