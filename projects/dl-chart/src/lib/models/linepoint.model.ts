import { IChartItem } from "./chartitem.interface";
import { IValue } from "./value.interface";

export class LinePoint implements IChartItem {
  id: string;
  color: string;
  sourceItem: IValue;
  calculatedPercent: number;

  x: number;
  y: number;
  size: number;
}