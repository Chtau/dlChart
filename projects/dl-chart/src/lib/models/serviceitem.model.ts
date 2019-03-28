export class ServiceItem<T> {
  chartId: string;
  value: T;
  tooltipX: number;
  tooltipY: number;

  constructor(
    chartId: string,
    value: T,
    tooltipX: number,
    tooltipY: number) {
      this.chartId = chartId;
      this.value = value;
      this.tooltipX = tooltipX;
      this.tooltipY = tooltipY;
  }
}