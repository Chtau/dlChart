import { IChartItem } from "./chartitem.interface";
import { IValue } from "./value.interface";
import { LinePoint } from "./linepoint.model";
import { AxisLine } from "./axisline.model";

export class AxisPoint implements IChartItem {
  id: string;
  color: string;
  sourceItem: IValue;
  calculatedPercent: number;
  allowActivate: boolean;

  drawCoords: string;
  points: LinePoint[];
  lines: AxisLine[];
}