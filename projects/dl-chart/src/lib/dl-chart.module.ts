import { NgModule } from '@angular/core';
import { DlPieChartModule } from './pie-chart/pie-chart.module';
import { DlLegendModule } from "./legend/legend.module";
import { DlBarChartModule } from "./bar-chart/bar-chart.module";
import { DlLineChartModule } from './line-chart/line-chart.module';

@NgModule({
  imports: [
    DlPieChartModule,
    DlLegendModule,
    DlBarChartModule,
    DlLineChartModule
  ],
  declarations: [
  ],
  providers: [
  ],
  exports: [
    DlPieChartModule,
    DlLegendModule,
    DlBarChartModule,
    DlLineChartModule
  ]
})
export class DlChartModule { }
