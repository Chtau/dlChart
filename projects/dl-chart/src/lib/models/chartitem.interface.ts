import { Value } from "./value.model";

export interface IChartItem {
  id: string;
  color: string;
  sourceItem: Value;
  calculatedPercent: number;
  allowActivate: boolean;
}
