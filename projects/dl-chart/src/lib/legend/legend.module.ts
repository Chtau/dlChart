import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendComponent } from "./legend.component";
import { ChartItemService } from '../services/chart-item.service';
import { UtilsService } from '../services/utils.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LegendComponent
  ],
  providers: [
    ChartItemService,
    UtilsService
  ],
  entryComponents: [ 
    LegendComponent
  ],
  exports: [
    LegendComponent
  ]
})
export class DlLegendModule { }
