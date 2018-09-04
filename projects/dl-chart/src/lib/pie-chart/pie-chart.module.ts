import { NgModule } from '@angular/core';
import { PieChartComponent } from './pie-chart.component';
import { CommonModule } from '@angular/common';
import { ChartItemService } from '../services/chart-item.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PieChartComponent
  ],
  providers: [
    ChartItemService
  ],
  entryComponents: [ 
    PieChartComponent
  ],
  exports: [
    PieChartComponent
  ]
})
export class DlPieChartModule { }
