import { IChartItem } from "./chartitem.interface";
import { IValue } from "./value.interface";

export class Slice implements IChartItem {
  id: string;
  color: string;
  sourceItem: IValue;
  calculatedPercent: number;

  draw: string;
}