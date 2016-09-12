import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent }   from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { FormsModule }   from '@angular/forms';


@NgModule({
    declarations: [AppComponent],
    imports:      [BrowserModule, HttpModule, RouterModule, routing, FormsModule],
    providers: [appRoutingProviders],
    bootstrap:    [AppComponent],
})
export class AppModule {}