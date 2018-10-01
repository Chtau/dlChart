import { NgModule } from '@angular/core';
import { LineChart1Component } from './line-chart.component';
import { CommonModule } from '@angular/common';
import { ChartItemService } from '../services/chart-item.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LineChart1Component
  ],
  providers: [
    ChartItemService
  ],
  entryComponents: [ 
    LineChart1Component
  ],
  exports: [
    LineChart1Component
  ]
})
export class DlLineChart1Module { }
