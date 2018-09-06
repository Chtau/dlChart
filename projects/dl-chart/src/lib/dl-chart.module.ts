import { NgModule } from '@angular/core';
import { DlPieChartModule } from './pie-chart/pie-chart.module';
import { DlLegendModule } from "./legend/legend.module";
import { DlBarChartModule } from "./bar-chart/bar-chart.module";

@NgModule({
  imports: [
    DlPieChartModule,
    DlLegendModule,
    DlBarChartModule
  ],
  declarations: [
  ],
  providers: [
  ],
  exports: [
    DlPieChartModule,
    DlLegendModule,
    DlBarChartModule
  ]
})
export class DlChartModule { }
