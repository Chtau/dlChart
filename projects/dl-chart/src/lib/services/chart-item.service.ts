import { Injectable, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { IChartItem } from '../models/chartitem.interface';
import { ServiceItem } from '../models/serviceitem.model';

@Injectable()
export class ChartItemService {

  values: ServiceItem<IChartItem[]>[] = [];

  public chartValueChange: EventEmitter<ServiceItem<IChartItem[]>> = new EventEmitter<ServiceItem<IChartItem[]>>();
  public chartValueHover: EventEmitter<ServiceItem<IChartItem>> = new EventEmitter<ServiceItem<IChartItem>>();
  public chartValueLeave: EventEmitter<ServiceItem<any>> = new EventEmitter<ServiceItem<any>>();
  public chartValueSelect: EventEmitter<ServiceItem<IChartItem>> = new EventEmitter<ServiceItem<IChartItem>>();
  public chartValueDeselect: EventEmitter<ServiceItem<IChartItem>> = new EventEmitter<ServiceItem<IChartItem>>();
  
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

  public hoverChartValue(val: ServiceItem<IChartItem>) {
    this.chartValueHover.emit(val);
  }

  public leaveChartValue(val: ServiceItem<any>) {
    this.chartValueLeave.emit(val);
  }

  public selectChartValue(val: ServiceItem<IChartItem>) {
    this.chartValueSelect.emit(val);
  }

  public deselectChartValue(val: ServiceItem<IChartItem>) {
    this.chartValueDeselect.emit(val);
  }


  constructor() { 

  }

}