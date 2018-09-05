import { Value } from "./value.model";
import { ITextConfiguration } from "./textConfiguration.interface";

export class TooltipConfiguration implements ITextConfiguration {
  HideValue: boolean = false;
  ValueFunction: (n: Value, percent: number) => string = null;

  constructor(
    HideValue: boolean = false,
    ValueFunction: (n: Value, percent: number) => string = null) {
      this.HideValue = HideValue;
      this.ValueFunction = ValueFunction;
  }
}