import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { DlChartModule } from "dlChart";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DlChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
