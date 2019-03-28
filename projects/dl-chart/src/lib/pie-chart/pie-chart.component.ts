import { Component, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';  
import { Value } from '../models/value.model';
import { ChartItemService } from '../services/chart-item.service';
import { BaseChartComponent } from '../shared/base-chart.component';
import { ServiceItem } from '../models/serviceitem.model';
import { Slice } from '../models/slice.model';
import { UtilsService } from '../services/utils.service';

@Component({  
  selector: 'dl-pie-chart',  
  templateUrl: './pie-chart.component.html',  
  styleUrls: ['./pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class PieChartComponent extends BaseChartComponent<Value> implements OnChanges {

  donutRadius: number = 0;

  @Input()
  set donut(val: number) {
    this.donutRadius = val;
  }

  slices: Slice[] = [];

  get pie() {
    return this.slices;
  }

  cssClassSegment(slice: Slice, index: number): string {
    let css: string = '';
    css += 'slice';
    if (slice === this.currentActiveChartItem) {
      css += ' slice-selected';
    }
    if (slice.sourceItem.cssClass != null) {
      css += ' ' + slice.sourceItem.cssClass;
    }
    if (index % 2 == 0) {
      css += ' ' + 'slice-anim-even';
    } else {
      css += ' ' + 'slice-anim';
    }
    return css;
  }

  createElementId(slice: Slice, index: number): string {
    let id: string = this.utilsService.createElementId('chart-slice-', index);
    slice.id = id;
    return id;
  } 

  constructor(chartItemService: ChartItemService, utilsService: UtilsService) {
      super(chartItemService, utilsService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetActiveElement();
    this.calculateSlices();
  }
  
  calculateSlices() {
    let cumulativePercent: number = 0;
    let totalValue: number = 0;
    this.slices = [];
    this.currentValues.forEach(item => {
      if (!item.value) {
        item.value = 0;
      }
      totalValue += item.value;
    });
    this.currentValues.forEach(item => {
      cumulativePercent = this.createSlice(item, totalValue, cumulativePercent);
    });

    this.chartItemService.setChartValues(new ServiceItem<Slice[]>(this.chartid, this.pie, null, null));
  }

  createSlice(item: Value, totalValue: number, cumulativePercent: number) {
    const [startX, startY] = this.getCoordinatesForPercent(cumulativePercent);
    let normValue = this.getNormalizedValue(totalValue, item.value);
    if (!normValue) {
      normValue = 0;
    }
    cumulativePercent += normValue;
    const [endX, endY] = this.getCoordinatesForPercent(cumulativePercent);

    const largeArcFlag = this.getNormalizedValue(totalValue, item.value) > .5 ? 1 : 0;
  
    var pathData = [
      `M ${startX} ${startY}`,
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      `L 0 0`,
    ].join(' ');
    if (normValue === 0) {
      pathData = null;
    }

    this.slices.push({
      color: item.color,
      draw: pathData,
      sourceItem: item,
      id: null,
      calculatedPercent: this.utilsService.roundScale((normValue * 100))
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