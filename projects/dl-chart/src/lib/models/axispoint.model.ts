import { IChartItem } from "./chartitem.interface";
import { Value } from "./value.model";
import { LinePoint } from "dlChart/lib/models/linepoint.model";

export class AxisPoint implements IChartItem {
  id: string;
  color: string;
  sourceItem: Value;
  calculatedPercent: number;
  allowActivate: boolean;

  drawCoords: string;
  points: LinePoint[];
}