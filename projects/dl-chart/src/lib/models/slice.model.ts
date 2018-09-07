import { IChartItem } from "./chartitem.interface";
import { Value } from "./value.model";

export class Slice implements IChartItem {
  id: string;
  color: string;
  sourceItem: Value;
  calculatedPercent: number;

  draw: string;
  allowActivate: boolean;
}