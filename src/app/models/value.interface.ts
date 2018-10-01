import { TooltipConfiguration } from "./tooltipconfiguration.model";

export interface IValue {
  name: string;
  color: string;
  cssClass: string;
  tooltipConfig: TooltipConfiguration;
  data: any;
}