import { Component, Input } from '@angular/core';
import { Axis } from '../models/axis.model';
import { ChartOrientation } from '../models/enums';

@Component({
  selector: '[yaxis]',
  templateUrl: './yaxis.component.html',
  styleUrls: ['./axis.component.scss'],
})
export class YAxisComponent {

  currentOrientation: ChartOrientation = ChartOrientation.Bottom;
  currentActiveScaleAxis: boolean = true;
  currentYAxis: Axis[] = [];
  currentScaleLabel: string = '';
  currentIsLeft: boolean = true;

  @Input()
  set orientation(val: ChartOrientation) {
    this.currentOrientation = val;
  }

  @Input()
  set yAxis(val: Axis[]) {
    this.currentYAxis = val;
  }

  @Input()
  set activeScaleAxis(val: boolean) {
    this.currentActiveScaleAxis = val;
  }

  @Input()
  set isLeft(val: boolean) {
    this.currentIsLeft = val;
  }

  @Input()
  set scaleLabel(val: string) {
    this.currentScaleLabel = val;
  }

  normOrientation(defaultValue: any, rightValue: any, leftValue: any, topValue: any,
    defaultValueRight: any, rightValueRight: any, leftValueRight: any, topValueRight: any) {
    if (this.currentOrientation === ChartOrientation.Bottom) {
      if (this.currentIsLeft) {
        return defaultValue;
      } else {
        return defaultValueRight;
      }
    } else if (this.currentOrientation === ChartOrientation.Right) {
      if (this.currentIsLeft) {
        return rightValue;
      } else {
        return rightValueRight;
      }
    } else if (this.currentOrientation === ChartOrientation.Left){
      if (this.currentIsLeft) {
        return leftValue;
      } else {
        return leftValueRight;
      }
    } else {
      if (this.currentIsLeft) {
        return topValue;
      } else {
        return topValueRight;
      }
    }
  }
}