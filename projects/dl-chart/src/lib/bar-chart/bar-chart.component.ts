import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';  
import { ChartItemService } from '../services/chart-item.service';
import { Value } from '../models/value.model';
import { Utils } from "../shared/utils";
import { BaseChartComponent } from '../shared/base-chart.component';
import { ServiceItem } from '../models/serviceitem.model';
import { Bar } from '../models/bar.model';
import { Axis } from '../models/axis.model';
import { ChartOrientation } from '../models/enums';

@Component({  
  selector: 'dl-bar-chart',  
  templateUrl: './bar-chart.component.html',  
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class BarChartComponent extends BaseChartComponent implements OnInit, AfterViewInit, OnChanges {
  
  viewBoxWidht: number = 450;
  viewBoxHeight: number = 450;
  barWidhtOffset: number = 15;
  valueSteps: number = 6;
  currentActiveBar: Bar = null;
  currentOrientation: ChartOrientation = ChartOrientation.Bottom;
  currentScaleLabel: string = 'Values';
  currentValues: Value[] = [];
  activeLeftScaleAxis: boolean = true;
  activeRightScaleAxis: boolean = false;

  xAxis: Axis[] = [];
  yAxis: Axis[] = [];
  bars: Bar[] = [];

  @Input()
  set values(val: Value[]) {
    this.currentValues = val;
  }

  @Input()
  set scaleLabel(val: string) {
    this.currentScaleLabel = val;
  }

  @Input()
  set steps(val: number) {
    this.valueSteps = val;
  }

  @Input()
  set barOffset(val: number) {
    this.barWidhtOffset = val;
  }

  @Input()
  set leftScaleAxis(val: boolean) {
    this.activeLeftScaleAxis = val;
  }

  @Input()
  set rightScaleAxis(val: boolean) {
    this.activeRightScaleAxis = val;
  }

  @Input()
  set orientation(val: ChartOrientation) {
    this.currentOrientation = val;
  }

  get chartStyle() {
    if (this.currentOrientation === ChartOrientation.Right) {
      return {"transform" : "rotate(-90deg)"};
    } else if (this.currentOrientation === ChartOrientation.Left) {
      return {"transform" : "rotate(90deg)"};
    } else if (this.currentOrientation === ChartOrientation.Top) {
      return {"transform" : "rotate(180deg)"};
    } else {
      return {"transform" : "rotate(0deg)"};
    }
  }

  get secondYAxisOrientation() {
    if (this.currentOrientation === ChartOrientation.Bottom) {
      return ChartOrientation.Top;
    } else if (this.currentOrientation === ChartOrientation.Left) {
      return ChartOrientation.Right;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return ChartOrientation.Left;
    } else if (this.currentOrientation === ChartOrientation.Top) {
      return ChartOrientation.Bottom;
    }
  }

  get yAxisTextStyle() {
    return this.onYAxisTextStyle(this.currentOrientation);
  }

  get yAxisTextStyleSecond() {
    return this.onYAxisTextStyle(this.currentOrientation, true);
  }

  onYAxisTextStyle(orientation: ChartOrientation, reverseAnchor: boolean = false) {
    if (orientation === ChartOrientation.Right) {
      return {"transform" : "rotate(90deg)", "text-anchor" : "middle"};
    } else if (orientation === ChartOrientation.Left) {
      return {"transform" : "rotate(-90deg)", "text-anchor" : "middle"};
    } else if (orientation === ChartOrientation.Top) {
      return {"transform" : "rotate(180deg)", "text-anchor" : (reverseAnchor ? "end" : "start") };
    } else {
      return {"transform" : "rotate(0deg)", "text-anchor" : (reverseAnchor ? "start" : "end") };
    }
  }

  get yAxisTextXPositionOffset() {
    return this.onYAxisTextXPositionOffset(this.currentOrientation);
  }

  get yAxisTextXPositionOffsetSecond() {
    return this.onYAxisTextXPositionOffset(this.secondYAxisOrientation);
  }

  onYAxisTextXPositionOffset(orientation: ChartOrientation) {
    if (orientation === ChartOrientation.Right) {
      return 0;
    } else if (orientation === ChartOrientation.Left) {
      return 0;
    } else if (orientation === ChartOrientation.Top) {
      return 9;
    } else {
      return -9;
    }
  }

  get yAxisTextYPositionOffset() {
    return this.onYAxisTextYPositionOffset(this.currentOrientation);
  }

  get yAxisTextYPositionOffsetSecond() {
    return this.onYAxisTextYPositionOffset(this.secondYAxisOrientation);
  }

  onYAxisTextYPositionOffset(orientation: ChartOrientation) {
    if (orientation === ChartOrientation.Right) {
      return 12;
    } else if (orientation === ChartOrientation.Left) {
      return -12;
    } else if (orientation === ChartOrientation.Top) {
      return 0;
    } else {
      return 0;
    }
  }

  get yAxisLabelTextStyle() {
    return this.onYAxisLabelTextStyle(this.currentOrientation);
  }

  get yAxisLabelTextStyleSecond() {
    return this.onYAxisLabelTextStyle(this.currentOrientation);
  }

  onYAxisLabelTextStyle(orientation: ChartOrientation) {
    if (orientation === ChartOrientation.Right) {
      return {"transform" : "rotate(90deg)", "text-anchor" : "start"};
    } else if (orientation === ChartOrientation.Left) {
      return {"transform" : "rotate(-90deg)", "text-anchor" : "end"};
    } else if (orientation === ChartOrientation.Top) {
      return {"transform" : "rotate(90deg)", "text-anchor" : "start"};
    } else {
      return {"transform" : "rotate(-90deg)", "text-anchor" : "end"};
    }
  }

  get yAxisLabelTextYPositionOffset() {
    return this.onYAxisLabelTextYPositionOffset(this.currentOrientation);
  }

  get yAxisLabelTextYPositionOffsetSecond() {
    if (this.currentOrientation === ChartOrientation.Right) {
      return -445;
    } else if (this.currentOrientation === ChartOrientation.Left) {
      return 438;
    } else if (this.currentOrientation === ChartOrientation.Top) {
      return -445;
    } else {
      return 438;
    }
  }

  onYAxisLabelTextYPositionOffset(orientation: ChartOrientation) {
    if (orientation === ChartOrientation.Right) {
      return -12;
    } else if (orientation === ChartOrientation.Left) {
      return 6;
    } else if (orientation === ChartOrientation.Top) {
      return -12;
    } else {
      return 6;
    }
  }

  get xAxisTextStyle() {
    return this.onXAxisTextStyle(this.currentOrientation);
  }

  onXAxisTextStyle(orientation: ChartOrientation) {
    if (orientation === ChartOrientation.Right) {
      return {"transform" : "rotate(90deg)", "text-anchor" : "start"};
    } else if (orientation === ChartOrientation.Left) {
      return {"transform" : "rotate(-90deg)", "text-anchor" : "end"};
    } else if (orientation === ChartOrientation.Top) {
      return {"transform" : "rotate(180deg)", "text-anchor" : "middle"};
    } else {
      return {"transform" : "rotate(0deg)", "text-anchor" : "middle"};
    }
  }

  get xAxisTextXPositionOffset() {
    return this.onXAxisTextXPositionOffset(this.currentOrientation);
  }

  onXAxisTextXPositionOffset(orientation: ChartOrientation) {
    if (orientation === ChartOrientation.Right) {
      return 9;
    } else if (orientation === ChartOrientation.Left) {
      return -9;
    } else if (orientation === ChartOrientation.Top) {
      return 0;
    } else {
      return 0;
    }
  }

  get xAxisTextYPositionOffset() {
    return this.onXAxisTextYPositionOffset(this.currentOrientation);
  }

  onXAxisTextYPositionOffset(orientation: ChartOrientation) {
    if (orientation === ChartOrientation.Right) {
      return -3.5;
    } else if (orientation === ChartOrientation.Left) {
      return -3.5;
    } else if (orientation === ChartOrientation.Top) {
      return -15;
    } else {
      return 9;
    }
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