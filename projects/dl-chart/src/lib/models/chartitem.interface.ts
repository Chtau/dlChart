import { IValue } from "dlChart/lib/models/value.interface";

export interface IChartItem {
  id: string;
  color: string;
  sourceItem: IValue;
  calculatedPercent: number;
  allowActivate: boolean;
}
