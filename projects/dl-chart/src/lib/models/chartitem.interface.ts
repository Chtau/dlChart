import { Value } from "./value.model";

export interface IChartItem {
  id: string;
  // draw: string;
  color: string;
  // allowActivate: boolean;
  sourceItem: Value;
  calculatedPercent: number;
}
