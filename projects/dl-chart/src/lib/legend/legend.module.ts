import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendComponent } from "./legend.component";
import { ChartItemService } from '../services/chart-item.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LegendComponent
  ],
  providers: [
    ChartItemService
  ],
  entryComponents: [ 
    LegendComponent
  ],
  exports: [
    LegendComponent
  ]
})
export class DlLegendModule { }
