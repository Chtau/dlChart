import { Value } from "./value.model";

export interface ITextConfiguration {
  HideValue: boolean;
  ValueFunction: (n: Value, percent: number) => string;
}