import { TooltipConfiguration } from "./tooltipconfiguration.model";
import { Point } from "./point.model";

export class Line {
  name: string;
  points: Point[];
  color: string;
  cssClass: string = null;
  tooltipConfig: TooltipConfiguration = null;
  data: any = null;

  constructor(
    name: string,
    points: Point[],
    color: string,
    cssClass: string = null,
    tooltipConfig: TooltipConfiguration = null,
    data: any = null) {
      this.name = name;
      this.points = points;
      this.color = color;
      this.cssClass = cssClass;
      this.tooltipConfig = tooltipConfig;
      this.data = data;
  }
}