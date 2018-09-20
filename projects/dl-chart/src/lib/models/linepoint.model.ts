import { IChartItem } from "./chartitem.interface";
import { Value } from "./value.model";

export class LinePoint implements IChartItem {
  id: string;
  color: string;
  sourceItem: Value;
  calculatedPercent: number;
  allowActivate: boolean;

  x: number;
  y: number;
  size: number;
}