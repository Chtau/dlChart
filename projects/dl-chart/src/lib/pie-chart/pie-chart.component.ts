import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';  
import { ChartItem } from '../models/chartitem.model';
import { Value } from '../models/value.model';
import { TooltipConfiguration } from '../models/tooltipconfiguration.model';
import { ChartItemService } from '../services/chart-item.service';

@Component({  
  selector: 'dl-pie-chart',  
  templateUrl: './pie-chart.component.html',  
  styleUrls: ['./pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class PieChartComponent implements OnInit, AfterViewInit {

  @Output() valueSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueDeselect: EventEmitter<any> = new EventEmitter<any>();

  @Output() valueClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  
  @Input()
  set values(val: Value[]) {
    this.currentValues = val;
    this.calculateSlices();
  }
  currentValues: Value[] = [];

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


  slices: ChartItem[] = [];

  currentActiveSlice: ChartItem;

  tooltipLeft: number;
  tooltipTop: number;
  tooltipShow: boolean = false;
  tooltipContentItem: Value;
  tooltipContentSlice: ChartItem;
  tooltipClass: string = '';

  get pie() {
    return this.slices;
  }

  get tooltipValue() {
    if (this.tooltipContentItem) {
      if (this.tooltipContentItem.tooltipConfig != null) {
        if (this.tooltipContentItem.tooltipConfig.ValueFunction != null) {
          return this.tooltipContentItem.tooltipConfig.ValueFunction(this.tooltipContentItem, this.tooltipContentSlice.calculatedPercent);
        } else {
          if (this.tooltipContentItem.tooltipConfig.HideValue) {
            return this.tooltipContentItem.name;  
          } else {
            return this.tooltipContentItem.name + ' ' + this.tooltipContentItem.value;
          }
        }
      } else {
        // use fallback / default configuration
        if (this.currentTooltipConfiguration != null) {
          if (this.currentTooltipConfiguration.ValueFunction != null) {
            return this.currentTooltipConfiguration.ValueFunction(this.tooltipContentItem, this.tooltipContentSlice.calculatedPercent);
          } else {
            if (this.currentTooltipConfiguration.HideValue) {
              return this.tooltipContentItem.name;  
            } else {
              return this.tooltipContentItem.name + ' ' + this.tooltipContentItem.value;
            }
          }
        } else {
          return this.tooltipContentItem.name;
        }
      }
    }
    return null;
  }

  cssClassSegment(slice: ChartItem, index: number): string {
    let css: string = '';
    if (slice.allowActivate) {
      css += 'slice';
    } else {
      css += 'fill';
    }
    if (slice === this.currentActiveSlice) {
      css += ' slice-selected';
    }
    if (slice.sourceItem) {
      if (slice.sourceItem.cssClass != null) {
        css += ' ' + slice.sourceItem.cssClass;
      }
    }
    if (index % 2 == 0) {
      css += ' ' + 'slice-anim-even';
    } else {
      css += ' ' + 'slice-anim';
    }
    return css;
  }

  createElementId(slice: ChartItem, index: number): string {
    let id: string = 'chart-slice-' + index;
    slice.id = id;
    return id;
  } 

  constructor(private chartItemService: ChartItemService) {
      
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }
  
  onClickSegment(event: ChartItem) {
    if (event.allowActivate) {
      if (this.currentAllowSelect) {
        if (event === this.currentActiveSlice) {
          this.currentActiveSlice = null;
          this.valueDeselect.emit(event.sourceItem);
        } else {
          this.currentActiveSlice = event;
          this.valueSelect.emit(event.sourceItem);
        }
      }
      this.valueClick.emit(event.sourceItem);
    }
  }

  onHoverSegment(event: any, slice: ChartItem) {
    if (slice.allowActivate) {
      this.tooltipContentSlice = slice;
      this.tooltipContentItem = slice.sourceItem;
      this.tooltipLeft = (event.clientX + 10);
      this.tooltipTop = (event.clientY + 10);
      this.tooltipShow = true;
      this.valueChange.emit(slice.sourceItem);
    }
  }

  onLeaveSegment(event: any) {
    this.tooltipContentSlice = null;
    this.tooltipContentItem = null;
    this.tooltipShow = false;
    this.valueChange.emit(null);
  }

  calculateSlices() {
    let cumulativePercent: number = 0;
    let totalValue: number = 0;
    this.slices = [];
    this.currentValues.forEach(item => {
      totalValue += item.value;
    });
    this.currentValues.forEach(item => {
      cumulativePercent = this.createSlice(item, totalValue, cumulativePercent, true);
    });
    this.chartItemService.items = this.pie;
  }

  createSlice(item: Value, totalValue: number, cumulativePercent: number, active: boolean) {
    const [startX, startY] = this.getCoordinatesForPercent(cumulativePercent);
    let normValue = this.getNormalizedValue(totalValue, item.value);
    cumulativePercent += normValue;
    const [endX, endY] = this.getCoordinatesForPercent(cumulativePercent);

    const largeArcFlag = this.getNormalizedValue(totalValue, item.value) > .5 ? 1 : 0;
  
    const pathData = [
      `M ${startX} ${startY}`,
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      `L 0 0`,
    ].join(' ');

    this.slices.push({
      color: item.color,
      draw: pathData,
      allowActivate: active,
      sourceItem: item,
      id: null,
      calculatedPercent: (normValue * 100)
    });

    return cumulativePercent;
  }

  getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  getNormalizedValue(totalValue: number, value: number): number {
    let percent: number = value / (totalValue / 100);
    if (percent < 0) {
      return 0;
    }
    return percent / 100;
  }

}