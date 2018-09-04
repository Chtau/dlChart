import { NgModule } from '@angular/core';
import { DlPieChartModule } from './pie-chart/pie-chart.module';
import { DlLegendModule } from "./legend/legend.module";

@NgModule({
  imports: [
    DlPieChartModule,
    DlLegendModule
  ],
  declarations: [
  ],
  providers: [
  ],
  exports: [
    DlPieChartModule,
    DlLegendModule
  ]
})
export class DlChartModule { }
