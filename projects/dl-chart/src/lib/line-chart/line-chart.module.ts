import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';
import { CommonModule } from '@angular/common';
import { ChartItemService } from '../services/chart-item.service';
import { YAxisTextComponent } from './yaxis-text.component';
import { YAxisComponent } from './yaxis.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    YAxisComponent,
    YAxisTextComponent,
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
