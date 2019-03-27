import { Component, Input } from '@angular/core';
import { Axis } from '../models/axis.model';

@Component({
  selector: '[yaxis]',
  templateUrl: './yaxis.component.html',
  styleUrls: ['./yaxis.component.scss'],
})
export class YAxisComponent {

  currentSVGX: string = '';
  currentSVGY: string = '';
  currentActiveScaleAxis: boolean = true;
  currentYAxis: Axis[] = [];
  currentIsLeft: boolean = true;

  innerLineX2: string = '';
  innerLineX1: string = '';
  innerTextX: string = '';
  innerTextStyle: string = '';
  lineX1: string = '';
  lineX2: string = '';

  @Input()
  set yAxis(val: Axis[]) {
    this.currentYAxis = val;
  }

  @Input()
  set activeScaleAxis(val: boolean) {
    this.currentActiveScaleAxis = val;
  }

  @Input()
  set svgX(val: string) {
    this.currentSVGX = val;
  }

  @Input()
  set svgY(val: string) {
    this.currentSVGY = val;
  }

  @Input()
  set isLeft(val: boolean) {
    this.currentIsLeft = val;
    if (this.currentIsLeft) {
      this.innerLineX1 = 'calc(100% - 6px)';
      this.innerLineX2 = '100%';
      this.innerTextX = '75%';
      this.innerTextStyle = 'end';
      //this.innerTextStyle = 'text-anchor:end';
      this.lineX1 = '100%';
      this.lineX2 = '100%';
    } else {
      this.innerLineX1 = '0';
      this.innerLineX2 = '6';
      this.innerTextX = '8';
      this.innerTextStyle = 'start';
      //this.innerTextStyle = 'text-anchor:start';
      this.lineX1 = '0';
      this.lineX2 = '0';
    }
  }

  currentSVGXLabel: string = '';
  currentSVGYLabel: string = '';
  currentScaleLabel: string = '';

  @Input()
  set scaleLabel(val: string) {
    this.currentScaleLabel = val;
  }

  @Input()
  set svgXLabel(val: string) {
    this.currentSVGXLabel = val;
  }

  @Input()
  set svgYLabel(val: string) {
    this.currentSVGYLabel = val;
  }
}