import { TooltipConfiguration } from "./tooltipconfiguration.model";

export class Point {
  xValue: number;
  yValue: number;
  color: string = null;
  cssClass: string = null;
  tooltipConfig: TooltipConfiguration = null;
  data: any = null;

  constructor(
    xValue: number,
    yValue: number,
    color: string = null,
    cssClass: string = null,
    tooltipConfig: TooltipConfiguration = null,
    data: any = null) {
      this.xValue = xValue;
      this.yValue = yValue;
      this.color = color;
      this.cssClass = cssClass;
      this.tooltipConfig = tooltipConfig;
      this.data = data;
  }
}