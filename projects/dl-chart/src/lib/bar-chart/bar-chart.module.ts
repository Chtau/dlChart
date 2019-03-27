import { NgModule } from '@angular/core';
import { BarChartComponent } from './bar-chart.component';
import { CommonModule } from '@angular/common';
import { ChartItemService } from '../services/chart-item.service';
import { AxisComponentsModule } from '../shared/axis-components.module';


@NgModule({
  imports: [
    AxisComponentsModule,
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
