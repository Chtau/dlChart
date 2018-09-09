import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation } from '@angular/core';  
import { Value } from '../models/value.model';
import { ChartItemService } from '../services/chart-item.service';
import { Utils } from '../shared/utils';
import { BaseChartComponent } from '../shared/base-chart.component';
import { ServiceItem } from '../models/serviceitem.model';
import { Slice } from '../models/slice.model';

@Component({  
  selector: 'dl-pie-chart',  
  templateUrl: './pie-chart.component.html',  
  styleUrls: ['./pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class PieChartComponent extends BaseChartComponent implements OnInit, AfterViewInit {

  @Input()
  set values(val: Value[]) {
    this.resetActiveElement();
    this.currentValues = val;
    this.calculateSlices();
  }
  currentValues: Value[] = [];

  slices: Slice[] = [];

  get pie() {
    return this.slices;
  }

  cssClassSegment(slice: Slice, index: number): string {
    let css: string = '';
    if (slice.allowActivate) {
      css += 'slice';
    } else {
      css += 'fill';
    }
    if (slice === this.currentActiveChartItem) {
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

  createElementId(slice: Slice, index: number): string {
    let id: string = Utils.createElementId('chart-slice-', index);
    slice.id = id;
    return id;
  } 

  constructor(chartItemService: ChartItemService) {
      super(chartItemService);
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }
  
  calculateSlices() {
    let cumulativePercent: number = 0;
    let totalValue: number = 0;
    this.slices = [];
    this.currentValues.forEach(item => {
      if (item.value === null || item.value === undefined) {
        item.value = 0;
      }
      totalValue += item.value;
    });
    this.currentValues.forEach(item => {
      cumulativePercent = this.createSlice(item, totalValue, cumulativePercent, true);
    });

    this.chartItemService.setChartValues(new ServiceItem<Slice[]>(this.chartid, this.pie));
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

  resetActiveElement() {
    super.resetActive();
  }

}