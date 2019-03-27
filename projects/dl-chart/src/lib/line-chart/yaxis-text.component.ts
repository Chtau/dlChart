import { Component, Input } from '@angular/core';

@Component({
  selector: '[yaxis-text]',
  templateUrl: './yaxis-text.component.html'
})
export class YAxisTextComponent {

  currentSVGX: string = '';
  currentSVGY: string = '';
  currentScaleLabel: string = '';
  currentActiveScaleAxis: boolean = true;

  @Input()
  set scaleLabel(val: string) {
    this.currentScaleLabel = val;
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
}