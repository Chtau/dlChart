import { ChartItemService } from '../services/chart-item.service';
import { Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TooltipConfiguration } from '../models/tooltipconfiguration.model';
import { IChartItem } from '../models/chartitem.interface';
import { ServiceItem } from '../models/serviceitem.model';
import { IValue } from '../models/value.interface';
import { UtilsService } from '../services/utils.service';

export class BaseChartComponent<T> {

  currentValues: T[] = [];

  tooltipLeft: number;
  tooltipTop: number;
  tooltipShow: boolean = false;
  tooltipContentItem: IValue;
  tooltipContentChartItem: IChartItem;
  tooltipClass: string = '';

  currentActiveChartItem: IChartItem;
  animationActive: boolean = true;

  @Input()
  set values(val: T[]) {
    this.currentValues = val;
    this.cd.detectChanges();
  }

  @Input()
  set animation(val: boolean) {
    this.animationActive = val;
  }

  @Output() valueSelect: EventEmitter<IValue> = new EventEmitter<IValue>();
  @Output() valueDeselect: EventEmitter<IValue> = new EventEmitter<IValue>();

  @Output() valueClick: EventEmitter<IValue> = new EventEmitter<IValue>();
  @Output() valueChange: EventEmitter<IValue> = new EventEmitter<IValue>();


  @Output() chartidChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  get chartid() {
    return this.currentChartid;
  }
  
  set chartid(val) {
    this.currentChartid = val;
    this.chartidChange.emit(this.currentChartid);
    this.cd.detectChanges();
  }
  currentChartid: string = 'dl-chart-1';

  @Input()
  set tooltipConfiguration(val: TooltipConfiguration) {
    this.currentTooltipConfiguration = val;
    this.cd.detectChanges();
  }
  currentTooltipConfiguration: TooltipConfiguration = null;
  
  @Input()
  set hideTooltip(val: boolean) {
    this.currentHideTooltip = val;
    this.cd.detectChanges();
  }
  currentHideTooltip: boolean = false;

  @Input()
  set allowSelect(val: boolean) {
    this.currentAllowSelect = val;
    this.cd.detectChanges();
  }
  currentAllowSelect: boolean = true;

  get tooltipValue() {
    if (this.tooltipContentItem) {
      if (this.tooltipContentItem.tooltipConfig != null) {
        return this.utilsService.textValue(this.tooltipContentItem.tooltipConfig, this.tooltipContentItem, this.tooltipContentChartItem.calculatedPercent);
      } else {
        return this.utilsService.textValue(this.currentTooltipConfiguration, this.tooltipContentItem, this.tooltipContentChartItem.calculatedPercent);
      }
    }
    return null;
  }

  constructor(public chartItemService: ChartItemService, public utilsService: UtilsService, public cd: ChangeDetectorRef) {
    
  }

  onClickSegment(event: IChartItem) {
    if (this.currentAllowSelect) {
      if (event === this.currentActiveChartItem) {
        this.currentActiveChartItem = null;
        this.valueDeselect.emit(event.sourceItem);
        this.chartItemService.chartValueDeselect.emit(new ServiceItem(this.chartid, event, null, null));
      } else {
        this.currentActiveChartItem = event;
        this.valueSelect.emit(event.sourceItem);
        this.chartItemService.chartValueSelect.emit(new ServiceItem(this.chartid, event, null, null));
      }
    }
    this.valueClick.emit(event.sourceItem);
  }

  onHoverSegment(event: any, item: IChartItem) {
    this.tooltipContentChartItem = item;
    this.tooltipContentItem = item.sourceItem;
    this.tooltipLeft = (event.clientX + 10);
    this.tooltipTop = (event.clientY + 10);
    if (this.currentHideTooltip === false) {
      this.tooltipShow = true;
    } else {
      this.tooltipShow = false;
    }
    this.valueChange.emit(item.sourceItem);
    this.chartItemService.chartValueHover.emit(new ServiceItem(this.chartid, item, this.tooltipLeft, this.tooltipTop));
  }

  onLeaveSegment(event: any) {
    this.tooltipContentChartItem = null;
    this.tooltipContentItem = null;
    this.tooltipShow = false;
    this.valueChange.emit(null);
    this.chartItemService.chartValueLeave.emit(new ServiceItem(this.chartid, null, null, null));
  }

  resetActive() {
    this.tooltipContentChartItem = null;
    this.tooltipContentItem = null;
    this.tooltipShow = false;
    this.valueChange.emit(null);
  }

}