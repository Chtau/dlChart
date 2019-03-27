import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';
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
    LineChartComponent
  ],
  providers: [
    ChartItemService,
    UtilsService
  ],
  entryComponents: [ 
    LineChartComponent
  ],
  exports: [
    LineChartComponent
  ]
})
export class DlLineChartModule { }
