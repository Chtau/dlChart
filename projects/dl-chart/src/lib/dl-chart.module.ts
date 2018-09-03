import { NgModule } from '@angular/core';
import { PieChartModule } from './pie-chart/pie-chart.module';

@NgModule({
  imports: [
    PieChartModule,
    
  ],
  declarations: [
  ],
  exports: [
    PieChartModule,
  ]
})
export class DlChartModule { }
