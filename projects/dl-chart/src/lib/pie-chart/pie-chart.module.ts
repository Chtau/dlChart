import { NgModule } from '@angular/core';
import { PieChartComponent } from './pie-chart.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PieChartComponent
  ],
  providers: [
    
  ],
  entryComponents: [ 
    PieChartComponent
  ],
  exports: [
    PieChartComponent
  ]
})
export class PieChartModule { }
