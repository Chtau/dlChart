import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';
import { CommonModule } from '@angular/common';
import { ChartItemService } from '../services/chart-item.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LineChartComponent
  ],
  providers: [
    ChartItemService
  ],
  entryComponents: [ 
    LineChartComponent
  ],
  exports: [
    LineChartComponent
  ]
})
export class DlLineChartModule { }
