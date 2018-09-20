import { IChartItem } from "./chartitem.interface";
import { Value } from "./value.model";
import { LinePoint } from "dlChart/lib/models/linepoint.model";
import { IValue } from "dlChart/lib/models/value.interface";

export class AxisPoint implements IChartItem {
  id: string;
  color: string;
  sourceItem: IValue;
  calculatedPercent: number;
  allowActivate: boolean;

  drawCoords: string;
  points: LinePoint[];
}