import { Component, Input, ViewEncapsulation, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ChartItemService } from '../services/chart-item.service';
import { Utils } from "../shared/utils";
import { ServiceItem } from '../models/serviceitem.model';
import { Axis } from '../models/axis.model';
import { Line } from '../models/line.model';
import { LinePoint } from '../models/linepoint.model';
import { AxisPoint } from '../models/axispoint.model';
import { BaseChartComponent } from '../shared/base-chart.component';

@Component({
  selector: 'dl-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LineChartComponent extends BaseChartComponent<Line> implements OnChanges {

  currentScaleLabel: string = '';
  valueSteps: number = 6;
  activeLeftScaleAxis: boolean = true;
  activeRightScaleAxis: boolean = false;

  activeHideRaster: boolean = false;
  activeHideLines: boolean = false;
  activeHideLinesFiller: boolean = false;
  activeHidePoints: boolean = false;
  activeHideSelectionLines: boolean = false;

  xAxis: Axis[] = [];
  yAxis: Axis[] = [];
  axisPoint: AxisPoint[] = [];

  @Input()
  set scaleLabel(val: string) {
    this.currentScaleLabel = val;
  }

  @Input()
  set steps(val: number) {
    this.valueSteps = val;
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
  set hideRaster(val: boolean) {
    this.activeHideRaster = val;
  }

  @Input()
  set hideLines(val: boolean) {
    this.activeHideLines = val;
  }

  @Input()
  set hideLinesFiller(val: boolean) {
    this.activeHideLinesFiller = val;
  }

  @Input()
  set hidePoints(val: boolean) {
    this.activeHidePoints = val;
  }

  @Input()
  set hideSelectionLines(val: boolean) {
    this.activeHideSelectionLines = val;
  }

  constructor(chartItemService: ChartItemService, cd: ChangeDetectorRef) {
    super(chartItemService)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.values != undefined && <Line[]>changes.values.currentValue != undefined && <Line[]>changes.values.previousValue != undefined) {
      if (!this.compare(changes.values.currentValue, changes.values.previousValue)) {
        this.resetActiveElement();
        this.calculateChart();
      }
    } else {
      this.resetActiveElement();
      this.calculateChart();
    }
  }

  compare(arr1, arr2): boolean {
    if (!arr1 || !arr2) return;
    let result: boolean = false;
    arr1.forEach((e1, i) => arr2.forEach(e2 => {
      if (e1.length > 1 && e2.length) {
        result = this.compare(e1, e2);
      } else if (e1 !== e2) {
        result = false
      } else {
        result = true
      }
    })
    );
    return result
  }

  calculateChart() {
    var items = this.currentValues;
    let uniqueXPoints: number[] = [];
    let uniqueYPoints: number[] = [];

    items.forEach(val => {
      val.points.forEach(point => {
        if (!uniqueXPoints.some(e => e === point.xValue)) {
          uniqueXPoints.push(point.xValue);
        }
        if (!uniqueYPoints.some(e => e === point.yValue)) {
          uniqueYPoints.push(point.yValue);
        }
      });
    });

    let xMinValue: number = Math.min.apply(Math, uniqueXPoints.map(function (o) { return o; }));
    let xMaxValue: number = Math.max.apply(Math, uniqueXPoints.map(function (o) { return o; }));
    let onePercentX: number = (xMaxValue - xMinValue) / 100;

    let yMinValue: number = Math.min.apply(Math, uniqueYPoints.map(function (o) { return o; }));
    let yMaxValue: number = Math.max.apply(Math, uniqueYPoints.map(function (o) { return o; }));

    var useMaxValueY = (yMaxValue - yMinValue);
    var singleStepY = (100 / this.valueSteps);
    var singleStepYValue = (useMaxValueY / this.valueSteps);

    this.yAxis = [];
    this.yAxis.push(
      {
        text: yMinValue.toString(),
        position: 100
      }
    );
    let index = 1;
    for (index = 1; index <= (this.valueSteps - 1); index++) {
      var currentValue = Utils.roundScale(yMinValue + (singleStepYValue * index));
      var step = 100 - Utils.roundScale(singleStepY * index);
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
    for (index = 0; index < (uniqueXPoints.length); index++) {
      xA.push(uniqueXPoints[index].toString());
    }
    this.xAxis = this.createAxis(xA, 100);

    this.axisPoint = [];

    var oneValueYPercent = useMaxValueY / 100;

    for (index = 0; index < items.length; index++) {
      const element = items[index];
      let pointAxis: LinePoint[] = [];
      let indexPoints: number = 0;
      let subItemId: string = Utils.createElementId('chart-line-point-', index);

      element.points.forEach(point => {
        let x: number = ((point.xValue - xMinValue) / onePercentX);
        var percentValueY = Utils.roundScale((point.yValue - yMinValue) / oneValueYPercent);
        var displayValueY = Utils.roundScale(percentValueY * 1);
        let y: number = 100 - displayValueY

        if (point.name === '' || point.name === null || point.name === undefined) {
          point.name = element.name;
        }

        pointAxis.push(
          {
            x: x,
            y: y,
            size: 5,
            sourceItem: point,
            calculatedPercent: Utils.roundScale((point.xValue - xMinValue) / onePercentX),
            color: point.color === null ? element.color : point.color,
            id: Utils.createElementId(subItemId + '-', indexPoints),
          }
        );

        indexPoints++;
      });
      this.axisPoint.push({
        points: pointAxis,
        sourceItem: element,
        calculatedPercent: null,
        color: element.color,
        id: Utils.createElementId('chart-line-axis-', index),
      });
    }

    this.chartItemService.setChartValues(new ServiceItem<AxisPoint[]>(this.chartid, this.axisPoint))
  }

  getPathFromAxisLine(points: LinePoint[]) {
    let path: string = "";
    points.forEach(line => {
      if (path != "") {
        path += " ";
      }
      path += line.x + "," + line.y;
    });
    return path;
  }

  createAxis(items: string[], length: number): Axis[] {
    let axis: Axis[] = [];
    var step = (length / (items.length - 1));
    for (let index = 0; index < (items.length); index++) {
      const element: string = items[index];
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

  get currentActivePoint(): LinePoint {
    if (this.currentActiveChartItem != null) {
      let point: LinePoint = this.currentActiveChartItem as LinePoint;
      if (point != undefined && point.x != undefined) {
        return point;
      }
    }
    return null;
  }

  get selectionXEndPoint() {
    if (this.currentActivePoint != null) {
      if (this.currentActivePoint.x > 50) {
        if (this.activeRightScaleAxis === true) {
          return 100;
        } else {
          return 0;
        }
      } else {
        if (this.activeLeftScaleAxis === true) {
          return 0;
        } else {
          return 100;
        }
      }
    }
  }

  xStartEndTextAnchor(index: number, length: number) {
    let anchor: string = 'middle';
    if (index === 0) {
      anchor = 'end'
    } else if (index === length - 1) {
      anchor = 'start'
    }
    return { "text-anchor": anchor };
  }

}