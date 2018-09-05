import { Injectable, Input, EventEmitter, Output } from '@angular/core';
import { ChartItem } from '../models/chartitem.model';
import { ServiceItem } from '../models/serviceitem.model';

@Injectable()
export class ChartItemService {

  values: ServiceItem<ChartItem[]>[] = [];

  @Output() itemsChange: EventEmitter<ServiceItem<ChartItem[]>> = new EventEmitter<ServiceItem<ChartItem[]>>();
  
  public setChartValues(val: ServiceItem<ChartItem[]>) {
    var values = this.values.find(item => {
      if (item.chartId === val.chartId) {
        return true;
      }
      return false;
    });
    if (values) {
      values = val;
    } else {
      this.values.push(val);
    }
    this.itemsChange.emit(val);
  }

  public getChartValues(chartId: string):ServiceItem<ChartItem[]> {
    return this.values.find(item => {
      if (item.chartId === chartId) {
        return true;
      }
      return false;
    });
  }

  constructor() { 

  }

}