import { ChartItemService } from '../services/chart-item.service';
import { BaseChartComponent } from './base-chart.component';
import { ChartOrientation } from '../models/enums';
import { Input } from '@angular/core';

export class ScaleBaseChartComponent<T> extends BaseChartComponent<T> {

  currentScaleLabel: string = 'Values';
  valueSteps: number = 6;
  activeLeftScaleAxis: boolean = true;
  activeRightScaleAxis: boolean = false;
  currentOrientation: ChartOrientation = ChartOrientation.Bottom;

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

  yAxisTextStyle(scale: number = 1.4) {
    return this.onYAxisTextStyle(this.currentOrientation, scale);
  }

  yAxisTextStyleSecond(scale: number = 1.4) {
    return this.onYAxisTextStyle(this.currentOrientation, scale, true);
  }

  onYAxisTextStyle(orientation: ChartOrientation, scale: number, reverseAnchor: boolean = false) {
    if (orientation === ChartOrientation.Right) {
      return {"transform" : "rotate(90deg)", "text-anchor" : "middle"};
    } else if (orientation === ChartOrientation.Left) {
      return {"transform" : "rotate(-90deg)", "text-anchor" : "middle"};
    } else if (orientation === ChartOrientation.Top) {
      return {"transform" : "rotate(180deg)", "text-anchor" : (reverseAnchor ? "end" : "start") };
    } else {
      return {"transform" : "rotate(0deg) scale(1, " + scale + ")", "text-anchor" : (reverseAnchor ? "start" : "end") };
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

  yAxisLabelTextStyle(scale: number) {
    return this.onYAxisLabelTextStyle(this.currentOrientation, scale);
  }

  get yAxisLabelTextStyleSecond() {
    return this.onYAxisLabelTextStyle(this.currentOrientation);
  }

  onYAxisLabelTextStyle(orientation: ChartOrientation, scale: number = 1) {
    if (orientation === ChartOrientation.Right) {
      return {"transform" : "rotate(90deg)", "text-anchor" : "start"};
    } else if (orientation === ChartOrientation.Left) {
      return {"transform" : "rotate(-90deg)", "text-anchor" : "end"};
    } else if (orientation === ChartOrientation.Top) {
      return {"transform" : "rotate(90deg)", "text-anchor" : "start"};
    } else {
      return {"transform" : "rotate(-90deg) scale(" + scale + ", 1)", "text-anchor" : "end"};
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

  xAxisTextStyle(scale: number = 0.6) {
    return this.onXAxisTextStyle(this.currentOrientation, scale);
  }

  onXAxisTextStyle(orientation: ChartOrientation, scale: number) {
    if (orientation === ChartOrientation.Right) {
      return {"transform" : "rotate(90deg)", "text-anchor" : "start"};
    } else if (orientation === ChartOrientation.Left) {
      return {"transform" : "rotate(-90deg)", "text-anchor" : "end"};
    } else if (orientation === ChartOrientation.Top) {
      return {"transform" : "rotate(180deg)", "text-anchor" : "middle"};
    } else {
      /*return JSON.parse(`{ "transform" : "rotate(0deg)",
      "text-anchor" : "middle",
      "transform" : "scale(1, .6)",
        }`);*/
      return {"transform" : "rotate(0deg) scale(1 , " + scale + ")", "text-anchor" : "middle" };
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
  
  constructor(public chartItemService: ChartItemService) {
    super(chartItemService);
  }

}