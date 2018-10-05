import { IChartItem } from "./chartitem.interface";
import { IValue } from "./value.interface";

export class Bar implements IChartItem {
  id: string;
  color: string;
  sourceItem: IValue;
  calculatedPercent: number;

  height: number;
  x: number;
  y: number;
  width: number;
  isMinusValue: boolean;
}