import { Component, Input } from '@angular/core';
import { Axis } from '../models/axis.model';
import { ChartOrientation } from '../models/enums';

@Component({
  selector: '[xaxis]',
  templateUrl: './xaxis.component.html',
  styleUrls: ['./axis.component.scss'],
})
export class XAxisComponent {

  currentOrientation: ChartOrientation = ChartOrientation.Bottom;
  currentXAxis: Axis[] = [];
  
  @Input()
  set orientation(val: ChartOrientation) {
    this.currentOrientation = val;
  }

  @Input()
  set xAxis(val: Axis[]) {
    this.currentXAxis = val;
  }

  normOrientation(defaultValue: any, rightValue: any, leftValue: any, topValue: any) {
    if (this.currentOrientation === ChartOrientation.Bottom) {
      return defaultValue;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return rightValue;
    } else if (this.currentOrientation === ChartOrientation.Left){
      return leftValue;
    } else {
      return topValue;
    }
  }
}