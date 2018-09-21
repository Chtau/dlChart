import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';  
import { ChartItemService } from '../services/chart-item.service';
import { Utils } from "../shared/utils";
import { ServiceItem } from '../models/serviceitem.model';
import { Axis } from '../models/axis.model';
import { Line } from '../models/line.model';
import { LinePoint } from '../models/linepoint.model';
import { AxisPoint } from '../models/axispoint.model';
import { ScaleBaseChartComponent } from '../shared/scale-base-chart.component';

@Component({  
  selector: 'dl-line-chart',  
  templateUrl: './line-chart.component.html',  
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class LineChartComponent extends ScaleBaseChartComponent<Line> implements OnInit, AfterViewInit, OnChanges {
  
  currentScaleMaxValue: number = 10;
  activeHideRaster: boolean = false;
  activeHideLines: boolean = false;

  xAxis: Axis[] = [];
  yAxis: Axis[] = [];
  axisPoint: AxisPoint[] = [];

  @Input()
  set scaleMaxValue(val: number) {
    this.currentScaleMaxValue = val;
  }

  @Input()
  set hideRaster(val: boolean) {
    this.activeHideRaster = val;
  }

  @Input()
  set hideLines(val: boolean) {
    this.activeHideLines = val;
  }

  constructor(chartItemService: ChartItemService) {
    super(chartItemService)
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
    
    let xMinValue: number = Math.min.apply(Math, uniqueXPoints.map(function(o) { return o; }));
    let xMaxValue: number = Math.max.apply(Math, uniqueXPoints.map(function(o) { return o; }));
    let oneDisplayPercentX: number = this.viewBoxWidht / 100;
    let onePercentX: number = (xMaxValue - xMinValue) / 100;

    let yMinValue: number = Math.min.apply(Math, uniqueYPoints.map(function(o) { return o; }));
    let yMaxValue: number = Math.max.apply(Math, uniqueYPoints.map(function(o) { return o; }));
    var oneDisplayPercentY = this.viewBoxHeight / 100;
 
    var useMaxValueY = (yMaxValue - yMinValue);
    var singleStepY = (this.viewBoxHeight / this.valueSteps);
    var singleStepYValue = (useMaxValueY / this.valueSteps);

    this.yAxis = [];
    this.yAxis.push(
      {
        text: yMinValue.toString(),
        position: this.viewBoxHeight
      }
    );
    for (let index = 1; index <= (this.valueSteps - 1); index++) {
      var currentValue = Utils.roundScale(yMinValue + (singleStepYValue * index));
      var step = this.viewBoxHeight - Utils.roundScale(singleStepY * index);
      this.yAxis.push(
        {
          text: currentValue.toString(),
          position: step
        }
      )
    }
    this.yAxis.push(
      {
        text: yMaxValue.toString(),
        position: 0
      }
    );

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
    
    this.axisPoint = [];

    var oneValueYPercent = useMaxValueY / 100;

    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      let draw: string = '';
      let pointAxis: LinePoint[] = [];
      let indexPoints: number = 0;
      let subItemId: string = Utils.createElementId('chart-line-point-', index);

      element.points.forEach(point => {
        let x: number = (oneDisplayPercentX * ((point.xValue - xMinValue) / onePercentX));
        var percentValueY = Utils.roundScale((point.yValue - yMinValue) / oneValueYPercent);
        var displayValueY = Utils.roundScale(percentValueY * oneDisplayPercentY);
        let y: number = (this.viewBoxHeight - displayValueY)
        draw += x + ',' + y + ' ';

        if (point.name === '' || point.name === null || point.name === undefined) {
          point.name = element.name;
        }

        pointAxis.push(
          {
            x: x,
            y: y,
            size: 8,
            sourceItem: point,
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
        sourceItem: element,
        calculatedPercent: null,
        color: element.color,
        id: Utils.createElementId('chart-line-axis-', index),
        allowActivate: false
      });
    }

    this.chartItemService.setChartValues(new ServiceItem<AxisPoint[]>(this.chartid, this.axisPoint))
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

  resetActiveElement() {
    super.resetActive();
  }

  cssClassSegmentPoint(item: LinePoint): string {
    let css: string = '';
    
    if (item === this.currentActiveChartItem) {
      css += ' point-selected';
    }
    if (item.sourceItem.cssClass != null) {
      css += ' ' + item.sourceItem.cssClass;
    }
    return css;
  }

  pointSize(item: LinePoint): number {
    if (item === this.currentActiveChartItem) {
      return item.size + 2;
    }
    return item.size;
  }

}