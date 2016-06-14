import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {enableProdMode} from "@angular/core";
import { HTTP_PROVIDERS } from '@angular/http';

if ('<%= ENV %>' === 'prod') {
    enableProdMode();
}

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS
]);