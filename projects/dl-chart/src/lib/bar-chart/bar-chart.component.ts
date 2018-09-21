import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';  
import { ChartItemService } from '../services/chart-item.service';
import { Value } from '../models/value.model';
import { Utils } from "../shared/utils";
import { BaseChartComponent } from '../shared/base-chart.component';
import { ServiceItem } from '../models/serviceitem.model';
import { Bar } from '../models/bar.model';
import { Axis } from '../models/axis.model';
import { ChartOrientation } from '../models/enums';
import { ScaleBaseChartComponent } from '../shared/scale-base-chart.component';

@Component({  
  selector: 'dl-bar-chart',  
  templateUrl: './bar-chart.component.html',  
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class BarChartComponent extends ScaleBaseChartComponent implements OnInit, AfterViewInit, OnChanges {
  
  viewBoxWidht: number = 450;
  viewBoxHeight: number = 450;
  barWidhtOffset: number = 15;
  currentActiveBar: Bar = null;
  currentValues: Value[] = [];
  shouldHideSelectLine: boolean = false;

  xAxis: Axis[] = [];
  yAxis: Axis[] = [];
  bars: Bar[] = [];

  @Input()
  set values(val: Value[]) {
    this.currentValues = val;
  }

  @Input()
  set hideSelectLine(val: boolean) {
    this.shouldHideSelectLine = val;
  }

  @Input()
  set barOffset(val: number) {
    this.barWidhtOffset = val;
  }

  constructor(chartItemService: ChartItemService) {
    super(chartItemService);
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetActiveElement();
    this.calculateChart();
  }


  calculateChart() {
    var items = this.currentValues;
    items.forEach(val => {
      if (!val.value) {
        val.value = 0;
      }
    })
    let maxValue: number = Math.max.apply(Math, items.map(function(o) { return o.value; }));
    var oneS = (maxValue / this.valueSteps)
    var yA: string[] = [];
    for (let index = 0; index < (this.valueSteps + 1); index++) {
      yA.push(Utils.roundScale(oneS * index).toString());
    }
    if (maxValue != 0) {
      this.createYAxis(yA);
    }

    var singleBarWidht = (((this.viewBoxWidht - this.barWidhtOffset) - (items.length * this.barWidhtOffset)) / items.length);
    let bars: { val: Value, position: number}[] = [];
    let index: number = 1;
    this.currentValues.forEach(item => {
      bars.push(
        {
          val: item,
          position: (this.barWidhtOffset * index) + (singleBarWidht * (index - 1))
        }
      );
      index++;
    });

    if (maxValue != 0) {
      this.createXAxis(singleBarWidht, bars);
    }
    this.createBars(maxValue, singleBarWidht, bars);

    this.chartItemService.setChartValues(new ServiceItem<Bar[]>(this.chartid, this.bars))
  }

  createXAxis(singleBarWidht: number, items: { val: Value, position: number}[]) {
    this.xAxis = [];

    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      var pos = ((element.position + singleBarWidht) - (singleBarWidht / 2));
      this.xAxis.push(
        {
          text: element.val.name,
          position: pos,
        }
      )
    }
  }

  createBars(maxValue: number, singleBarWidht: number, items: { val: Value, position: number}[]) {
    var onePercent = maxValue / 100;
    var oneDisplayPercent = this.viewBoxHeight / 100;

    this.bars = [];
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      this.bars.push(
        {
          width: singleBarWidht,
          height: element.val.value === 0 ? 0 : (oneDisplayPercent * (element.val.value / onePercent)),
          position: element.position,
          sourceItem: element.val,
          calculatedPercent: element.val.value === 0 ? 0 : (element.val.value / onePercent),
          color: element.val.color,
          id: Utils.createElementId('chart-bar-', index),
          allowActivate: true
        }
      );
    }
  }

  createYAxis(items: string[]) {
    this.yAxis = [];
    var step = (this.viewBoxHeight / (items.length - 1));
    for (let index = 0; index < (items.length - 1); index++) {
      const element = items[index];
      this.yAxis.push(
        {
          text: element,
          position: this.viewBoxHeight - (step * index),
        }
      )
    }

    this.yAxis.push(
      {
        text: items[items.length - 1],
        position: 0,
      }
    )
  }

  onClickSegment(event: Bar) {
    super.onClickSegment(event);
    
    if (event === this.currentActiveChartItem) {
      this.currentActiveBar = event;
    } else {
      this.currentActiveBar = null;
    }
  }

  resetActiveElement() {
    this.currentActiveBar = null;
    super.resetActive();
  }

  cssClassSegment(item: Bar): string {
    let css: string = '';
    
    if (item === this.currentActiveChartItem) {
      css += ' bar-selected';
    }
    if (item.sourceItem) {
      if (item.sourceItem.cssClass != null) {
        css += ' ' + item.sourceItem.cssClass;
      }
    }
    return css;
  }

}