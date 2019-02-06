import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { DlChartModule } from "dlChart";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    DlChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
