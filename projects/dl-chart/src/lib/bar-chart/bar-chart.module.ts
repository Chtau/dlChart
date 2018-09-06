import { NgModule } from '@angular/core';
import { BarChartComponent } from './bar-chart.component';
import { CommonModule } from '@angular/common';
import { ChartItemService } from '../services/chart-item.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BarChartComponent
  ],
  providers: [
    ChartItemService
  ],
  entryComponents: [ 
    BarChartComponent
  ],
  exports: [
    BarChartComponent
  ]
})
export class DlBarChartModule { }
