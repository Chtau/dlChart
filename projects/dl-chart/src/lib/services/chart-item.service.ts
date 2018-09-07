import { Injectable, Input, EventEmitter, Output } from '@angular/core';
import { IChartItem } from '../models/chartitem.interface';
import { ServiceItem } from '../models/serviceitem.model';

@Injectable()
export class ChartItemService {

  values: ServiceItem<IChartItem[]>[] = [];

  public chartValueChange: EventEmitter<ServiceItem<IChartItem[]>> = new EventEmitter<ServiceItem<IChartItem[]>>();
  
  public setChartValues(val: ServiceItem<IChartItem[]>) {
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
    this.chartValueChange.emit(val);
  }

  public getChartValues(chartId: string):ServiceItem<IChartItem[]> {
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