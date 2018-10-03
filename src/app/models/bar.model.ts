import { IChartItem } from "./chartitem.interface";
import { IValue } from "./value.interface";

export class Bar implements IChartItem {
  id: string;
  color: string;
  sourceItem: IValue;
  calculatedPercent: number;
  allowActivate: boolean;

  height: number;
  x: number;
  y: number;
  width: number;
  isMinusValue: boolean;
}