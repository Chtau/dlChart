import { Value } from "./value.model";

export class TooltipConfiguration {
  HideValue: boolean = false;
  ValueFunction: (n: Value, percent: number) => string = null;

  constructor(
    HideValue: boolean = false,
    ValueFunction: (n: Value, percent: number) => string = null) {
      this.HideValue = HideValue;
      this.ValueFunction = ValueFunction;
  }
}