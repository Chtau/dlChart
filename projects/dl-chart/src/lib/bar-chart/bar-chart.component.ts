import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';  
import { ChartItemService } from '../services/chart-item.service';
import { Value } from '../models/value.model';
import { LegendConfiguration } from '../models/legendconfiguration.model';
import { Utils } from "../shared/utils";
import { BaseChartComponent } from '../shared/base-chart.component';
import { ServiceItem } from '../models/serviceitem.model';
import { Bar } from '../models/bar.model';
import { Axis } from '../models/axis.model';

@Component({  
  selector: 'dl-bar-chart',  
  templateUrl: './bar-chart.component.html',  
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class BarChartComponent extends BaseChartComponent implements OnInit, AfterViewInit {

  viewBoxWidht: number = 450;
  viewBoxHeight: number = 450;
  barWidhtOffset: number = 15;
  valueSteps: number = 6;

  xAxis: Axis[] = [];
  yAxis: Axis[] = [];
  bars: Bar[] = [];


  @Input()
  set values(val: Value[]) {
    this.currentValues = val;
    this.calculateChart();
  }
  currentValues: Value[] = [];

  @Input()
  set scaleLabel(val: string) {
    this.currentScaleLabel = val;
  }
  currentScaleLabel: string = 'Values';

  constructor(chartItemService: ChartItemService) {
    super(chartItemService);
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }

  calculateChart() {
    var items = this.currentValues.sort((a, b) => {
      if (a.value < b.value) {
        return 1;
      }
      return 0;
    });
    var maxItem = items[0];
    let maxValue: number = maxItem.value;
    var oneS = (maxValue / this.valueSteps)
    var yA: string[] = [];
    for (let index = 0; index < (this.valueSteps + 1); index++) {
      yA.push(Utils.roundScale(oneS * index).toString());
    }
    this.createYAxis(yA);


    var singleBarWidht = ((this.viewBoxWidht - (items.length * this.barWidhtOffset)) / items.length);
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

    this.createXAxis(singleBarWidht, bars);
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
          height: (oneDisplayPercent * (element.val.value / onePercent)),
          position: element.position,
          sourceItem: element.val,
          calculatedPercent: (element.val.value / onePercent),
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

}