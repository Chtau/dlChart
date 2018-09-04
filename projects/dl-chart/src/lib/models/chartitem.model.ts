import { Value } from "./value.model";

export class ChartItem {
  id: string;
  draw: string;
  color: string;
  allowActivate: boolean;
  sourceItem: Value;
  calculatedPercent: number;
}
