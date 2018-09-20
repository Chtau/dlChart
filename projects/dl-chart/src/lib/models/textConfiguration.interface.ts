import { IValue } from "dlChart/lib/models/value.interface";

export interface ITextConfiguration {
  HideValue: boolean;
  ValueFunction: (n: IValue, percent: number) => string;
}