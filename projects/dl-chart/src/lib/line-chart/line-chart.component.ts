import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';  
import { ChartItemService } from '../services/chart-item.service';
import { Value } from '../models/value.model';
import { Utils } from "../shared/utils";
import { BaseChartComponent } from '../shared/base-chart.component';
import { ServiceItem } from '../models/serviceitem.model';
import { Axis } from '../models/axis.model';
import { ChartOrientation } from '../models/enums';
import { Line } from '../models/line.model';
import { LinePoint } from '../models/linepoint.model';
import { AxisPoint } from '../models/axispoint.model';

@Component({  
  selector: 'dl-line-chart',  
  templateUrl: './line-chart.component.html',  
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class LineChartComponent extends BaseChartComponent implements OnInit, AfterViewInit, OnChanges {
  
  viewBoxWidht: number = 450;
  viewBoxHeight: number = 450;
  valueSteps: number = 6;
  currentScaleMaxValue: number = 10;
  currentOrientation: ChartOrientation = ChartOrientation.Bottom;
  currentScaleLabel: string = 'Values';
  currentValues: Line[] = [];
  activeLeftScaleAxis: boolean = true;
  activeRightScaleAxis: boolean = false;
  currentActiveLinePoint: LinePoint = null;
  currentActiveAxisPoint: AxisPoint = null;

  xAxis: Axis[] = [];
  yAxis: Axis[] = [];
  axisPoint: AxisPoint[] = [];

  @Input()
  set values(val: Line[]) {
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
  set scaleMaxValue(val: number) {
    this.currentScaleMaxValue = val;
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
    if (this.currentOrientation === ChartOrientation.Top) {
      return ChartOrientation.Bottom;
    } else if (this.currentOrientation === ChartOrientation.Left) {
      return ChartOrientation.Right;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return ChartOrientation.Left;
    } else {
      return ChartOrientation.Top;
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
    let maxValueY: number = 0;
    let uniqueXPoints: number[] = [];
    let uniqueYPoints: number[] = [];

    items.forEach(val => {
      // get the max Value for X and Y axis
      // get unique x points
      val.points.forEach(point => {
        if (!uniqueXPoints.some(e => e === point.xValue)) {
          uniqueXPoints.push(point.xValue);
        }
        if (!uniqueYPoints.some(e => e === point.yValue)) {
          uniqueYPoints.push(point.yValue);
        }
        if (point.yValue > maxValueY) {
          maxValueY = point.yValue;
        }
      });
    });

    if (maxValueY > this.currentScaleMaxValue) {
      this.currentScaleMaxValue = maxValueY;
    }

    var oneS = (this.currentScaleMaxValue / this.valueSteps)
    var yA: string[] = [];
    for (let index = 1; index <= (this.valueSteps); index++) {
      yA.push(Utils.roundScale(oneS * index).toString());
    }
    this.yAxis = this.createAxis(yA, this.viewBoxHeight);


    // sort the uniqueXPoints
    uniqueXPoints = uniqueXPoints.sort((a, b) => {
      if (a > b) {
        return 0;
      }
      return 1;
    });

    var xA: string[] = [];
    for (let index = 0; index < (uniqueXPoints.length); index++) {
      xA.push(uniqueXPoints[index].toString());
    }
    this.xAxis = this.createAxis(xA, this.viewBoxWidht);


    let xMinValue: number = Math.min.apply(Math, uniqueXPoints.map(function(o) { return o; }));
    let xMaxValue: number = Math.max.apply(Math, uniqueXPoints.map(function(o) { return o; }));
    let oneDisplayPercentX: number = this.viewBoxWidht / 100;
    let onePercentX: number = (xMaxValue - xMinValue) / 100;

    let yMinValue: number = Math.min.apply(Math, uniqueYPoints.map(function(o) { return o; }));
    let yMaxValue: number = Math.max.apply(Math, uniqueYPoints.map(function(o) { return o; }));
    var oneDisplayPercentY = this.viewBoxHeight / 100;
    let onePercentY: number = (yMaxValue - yMinValue) / 100;
    
    this.axisPoint = [];
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      let draw: string = '';
      let pointAxis: LinePoint[] = [];
      let indexPoints: number = 0;
      let subItemId: string = Utils.createElementId('chart-line-point-', index);

      element.points.forEach(point => {
        let x: number = (oneDisplayPercentX * ((point.xValue - xMinValue) / onePercentX));
        let y: number = (this.viewBoxHeight - (oneDisplayPercentY * ((point.yValue - yMinValue) / onePercentY)));
        draw += x + ',' + y + ' ';

        pointAxis.push(
          {
            x: x,
            y: y,
            size: 8,
            sourceItem: null,
            calculatedPercent: ((point.xValue - xMinValue) / onePercentX),
            color: point.color === null ? element.color : point.color,
            id: Utils.createElementId(subItemId + '-', indexPoints),
            allowActivate: true
          }
        );
        indexPoints++;
      });
      this.axisPoint.push({
        drawCoords: draw,
        points: pointAxis,
        sourceItem: null,
        calculatedPercent: null,
        color: element.color,
        id: Utils.createElementId('chart-line-axis-', index),
        allowActivate: false
      });
    }
  }

  createAxis(items: string[], length: number) : Axis[] {
    let axis:Axis[]  = [];
    var step = (length / (items.length - 1));
    for (let index = 0; index < (items.length); index++) {
      const element = items[index];
      axis.push(
        {
          text: element,
          position: length - (step * index),
        }
      )
    }
    return axis;
  }

  onClickSegmentAxis(axis: LinePoint) {
    super.onClickSegment(axis);

    if (axis === this.currentActiveLinePoint) {
      this.currentActiveLinePoint = axis;
    } else {
      this.currentActiveLinePoint = null;
    }
  }

  onClickSegmentPoint(point: AxisPoint) {
    super.onClickSegment(point);
    
    if (point === this.currentActiveAxisPoint) {
      this.currentActiveAxisPoint = point;
    } else {
      this.currentActiveAxisPoint = null;
    }
  }

  resetActiveElement() {
    this.currentActiveLinePoint = null;
    this.currentActiveAxisPoint = null;
    super.resetActive();
  }

  cssClassSegmentPoint(item: LinePoint): string {
    let css: string = '';
    
    if (item === this.currentActiveChartItem) {
      css += ' point-selected';
    }
    if (item.sourceItem) {
      if (item.sourceItem.cssClass != null) {
        css += ' ' + item.sourceItem.cssClass;
      }
    }
    return css;
  }

  pointSize(item: LinePoint): number {
    if (item === this.currentActiveChartItem) {
      return item.size + 2;
    }
    return item.size;
  }

  cssClassSegmentAxis(item: AxisPoint): string {
    let css: string = '';
    
    if (item === this.currentActiveChartItem) {
      css += ' line-selected';
    }
    if (item.sourceItem) {
      if (item.sourceItem.cssClass != null) {
        css += ' ' + item.sourceItem.cssClass;
      }
    }
    return css;
  }

}