import { IChartItem } from "./chartitem.interface";
import { IValue } from "./value.interface";
import { LinePoint } from "./linepoint.model";

export class AxisPoint implements IChartItem {
  id: string;
  color: string;
  sourceItem: IValue;
  calculatedPercent: number;
  allowActivate: boolean;

  drawCoords: string;
  points: LinePoint[];
}