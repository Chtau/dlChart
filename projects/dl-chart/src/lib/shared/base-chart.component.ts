import { ChartItemService } from '../services/chart-item.service';
import { Output, Input, EventEmitter } from '@angular/core';
import { Value } from '../models/value.model';
import { TooltipConfiguration } from '../models/tooltipconfiguration.model';
import { Utils } from './utils';
import { IChartItem } from '../models/chartitem.interface';

export class BaseChartComponent {

  tooltipLeft: number;
  tooltipTop: number;
  tooltipShow: boolean = false;
  tooltipContentItem: Value;
  tooltipContentChartItem: IChartItem;
  tooltipClass: string = '';

  currentActiveChartItem: IChartItem;

  @Output() valueSelect: EventEmitter<Value> = new EventEmitter<Value>();
  @Output() valueDeselect: EventEmitter<Value> = new EventEmitter<Value>();

  @Output() valueClick: EventEmitter<Value> = new EventEmitter<Value>();
  @Output() valueChange: EventEmitter<Value> = new EventEmitter<Value>();


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

  @Input()
  set tooltipConfiguration(val: TooltipConfiguration) {
    this.currentTooltipConfiguration = val;
  }
  currentTooltipConfiguration: TooltipConfiguration = null;
  
  @Input()
  set allowSelect(val: boolean) {
    this.currentAllowSelect = val;
  }
  currentAllowSelect: boolean = true;

  get tooltipValue() {
    if (this.tooltipContentItem) {
      if (this.tooltipContentItem.tooltipConfig != null) {
        return Utils.textValue(this.tooltipContentItem.tooltipConfig, this.tooltipContentItem, this.tooltipContentChartItem.calculatedPercent);
      } else {
        // use fallback / default configuration
        return Utils.textValue(this.currentTooltipConfiguration, this.tooltipContentItem, this.tooltipContentChartItem.calculatedPercent);
      }
    }
    return null;
  }


  constructor(public chartItemService: ChartItemService) {
    
  }



  onClickSegment(event: IChartItem) {
    if (event.allowActivate) {
      if (this.currentAllowSelect) {
        if (event === this.currentActiveChartItem) {
          this.currentActiveChartItem = null;
          this.valueDeselect.emit(event.sourceItem);
        } else {
          this.currentActiveChartItem = event;
          this.valueSelect.emit(event.sourceItem);
        }
      }
      this.valueClick.emit(event.sourceItem);
    }
  }

  onHoverSegment(event: any, item: IChartItem) {
    if (item.allowActivate) {
      this.tooltipContentChartItem = item;
      this.tooltipContentItem = item.sourceItem;
      this.tooltipLeft = (event.clientX + 10);
      this.tooltipTop = (event.clientY + 10);
      this.tooltipShow = true;
      this.valueChange.emit(item.sourceItem);
    }
  }

  onLeaveSegment(event: any) {
    this.tooltipContentChartItem = null;
    this.tooltipContentItem = null;
    this.tooltipShow = false;
    this.valueChange.emit(null);
  }

}