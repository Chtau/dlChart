import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { DlChartModule } from "dlChart";
import { DlLineChart1Module } from './line-chart/line-chart.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    DlChartModule,
    DlLineChart1Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
