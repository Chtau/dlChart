export class ServiceItem<T> {
  chartId: string;
  value: T;

  constructor(
    chartId: string,
    value: T) {
      this.chartId = chartId;
      this.value = value;
  }
}