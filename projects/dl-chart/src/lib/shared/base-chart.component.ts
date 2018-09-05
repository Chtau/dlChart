import { ChartItemService } from '../services/chart-item.service';
import { Output, Input, EventEmitter } from '@angular/core';

export class BaseChartComponent {

  @Output() chartidChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  get chartid() {
    return this.currentChartid;
  }
  
  set chartid(val) {
    this.currentChartid = val;
    this.chartidChange.emit(this.currentChartid);
  }
  currentChartid: string = 'dl-chart-1';

  constructor(public chartItemService: ChartItemService) {
    
  }

}