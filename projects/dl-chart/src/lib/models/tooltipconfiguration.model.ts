import { ITextConfiguration } from "./textConfiguration.interface";
import { IValue } from "dlChart/lib/models/value.interface";

export class TooltipConfiguration implements ITextConfiguration {
  HideValue: boolean = false;
  ValueFunction: (n: IValue, percent: number) => string = null;

  constructor(
    HideValue: boolean = false,
    ValueFunction: (n: IValue, percent: number) => string = null) {
      this.HideValue = HideValue;
      this.ValueFunction = ValueFunction;
  }
}