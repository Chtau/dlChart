import { IValue } from "./value.interface";

export interface IChartItem {
  id: string;
  color: string;
  sourceItem: IValue;
  calculatedPercent: number;
  allowActivate: boolean;
}
