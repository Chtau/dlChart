import { TooltipConfiguration } from "./tooltipconfiguration.model";
import { IValue } from "./value.interface";

export class Value implements IValue {
  name: string;
  value: number;
  color: string;
  cssClass: string = null;
  tooltipConfig: TooltipConfiguration = null;
  data: any = null;

  constructor(
    name: string,
    value: number,
    color: string,
    cssClass: string = null,
    tooltipConfig: TooltipConfiguration = null,
    data: any = null) {
      this.name = name;
      this.value = value;
      this.color = color;
      this.cssClass = cssClass;
      this.tooltipConfig = tooltipConfig;
      this.data = data;
  }
}