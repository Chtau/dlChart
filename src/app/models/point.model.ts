import { TooltipConfiguration } from "./tooltipconfiguration.model";
import { IValue } from "./value.interface";

export class Point implements IValue {
  name: string = null;
  xValue: number;
  yValue: number;
  color: string = null;
  cssClass: string = null;
  tooltipConfig: TooltipConfiguration = null;
  data: any = null;

  constructor(
    xValue: number,
    yValue: number,
    name: string = null,
    color: string = null,
    cssClass: string = null,
    tooltipConfig: TooltipConfiguration = null,
    data: any = null) {
      this.xValue = xValue;
      this.yValue = yValue;
      this.name = name;
      this.color = color;
      this.cssClass = cssClass;
      this.tooltipConfig = tooltipConfig;
      this.data = data;
  }
}