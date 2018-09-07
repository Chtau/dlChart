import { IChartItem } from "./chartitem.interface";
import { Value } from "./value.model";

export class Bar implements IChartItem {
  id: string;
  color: string;
  sourceItem: Value;
  calculatedPercent: number;

  height: number;
  position: number;
  width: number;
}