import { NgModule } from '@angular/core';
import { BarChartComponent1 } from './bar-chart.component';
import { CommonModule } from '@angular/common';
import { ChartItemService } from '../services/chart-item.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BarChartComponent1
  ],
  providers: [
    ChartItemService
  ],
  entryComponents: [ 
    BarChartComponent1
  ],
  exports: [
    BarChartComponent1
  ]
})
export class DlBarChartModule1 { }
