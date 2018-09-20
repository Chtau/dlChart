import { IChartItem } from "./chartitem.interface";
import { Value } from "./value.model";
import { IValue } from "dlChart/lib/models/value.interface";

export class Bar implements IChartItem {
  id: string;
  color: string;
  sourceItem: IValue;
  calculatedPercent: number;
  allowActivate: boolean;

  height: number;
  position: number;
  width: number;
}