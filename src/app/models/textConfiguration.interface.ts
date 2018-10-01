import { IValue } from "./value.interface";

export interface ITextConfiguration {
  HideValue: boolean;
  ValueFunction: (n: IValue, percent: number) => string;
}