import { NgModule } from '@angular/core';
import { BarChartComponent } from './bar-chart.component';
import { CommonModule } from '@angular/common';
import { ChartItemService } from '../services/chart-item.service';
import { ComponentsModule } from '../shared/components.module';


@NgModule({
  imports: [
    ComponentsModule,
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
