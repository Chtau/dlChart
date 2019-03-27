import { NgModule } from '@angular/core';
import { BarChartComponent } from './bar-chart.component';
import { CommonModule } from '@angular/common';
import { ChartItemService } from '../services/chart-item.service';
import { AxisComponentsModule } from '../shared/axis-components.module';
import { UtilsService } from '../services/utils.service';


@NgModule({
  imports: [
    AxisComponentsModule,
    CommonModule
  ],
  declarations: [
    BarChartComponent
  ],
  providers: [
    ChartItemService,
    UtilsService
  ],
  entryComponents: [ 
    BarChartComponent
  ],
  exports: [
    BarChartComponent
  ]
})
export class DlBarChartModule { }
