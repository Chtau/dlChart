import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';  
import { ChartItemService } from '../services/chart-item.service';
import { IChartItem } from '../models/chartitem.interface';
import { Value } from '../models/value.model';
import { LegendConfiguration } from '../models/legendconfiguration.model';
import { Utils } from "../shared/utils";
import { BaseChartComponent } from '../shared/base-chart.component';
import { ServiceItem } from '../models/serviceitem.model';

@Component({  
  selector: 'dl-chart-legend',  
  templateUrl: './legend.component.html',  
  styleUrls: ['./legend.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class LegendComponent extends BaseChartComponent implements OnInit, AfterViewInit {

  @Output() legendClick: EventEmitter<Value> = new EventEmitter<Value>();

  items: ServiceItem<IChartItem[]> = null;
  hoverItem: IChartItem = null;
  selectedItem: IChartItem = null;

  get chartItems():IChartItem[] {
    if (this.items) {
    return this.items.value;
    }
    return [];
  }

  @Input()
  set legendConfiguration(val: LegendConfiguration) {
    this.currentLegendConfiguration = val;
  }
  currentLegendConfiguration: LegendConfiguration = null;

  constructor(chartItemService: ChartItemService) {
    super(chartItemService);
  }

  ngOnInit() {
    this.items = this.chartItemService.getChartValues(this.chartid);

    this.chartItemService.chartValueChange.subscribe(items => {
      if (items.chartId === this.chartid) {
        this.items = items;
      }
    });
    this.chartItemService.chartValueSelect.subscribe((item: ServiceItem<IChartItem>) => {
      if (item.chartId === this.chartid) {
        this.selectedItem = item.value;
      }
    });
    this.chartItemService.chartValueDeselect.subscribe((item: ServiceItem<IChartItem>) => {
      if (item.chartId === this.chartid) {
        this.selectedItem = null;
      }
    });
    this.chartItemService.chartValueHover.subscribe((item: ServiceItem<IChartItem>) => {
      if (item.chartId === this.chartid) {
        this.hoverItem = item.value;
      }
    });
    this.chartItemService.chartValueLeave.subscribe((item: ServiceItem<any>) => {
      if (item.chartId === this.chartid) {
        this.hoverItem = null;
      }
    });
  }

  ngAfterViewInit(): void {

  }

  legendTextValue(item: IChartItem) {
    return Utils.textValue(this.currentLegendConfiguration, item.sourceItem, item.calculatedPercent);
  }

  tooltipTextValue(item: IChartItem) {
    return Utils.textValue(item.sourceItem.tooltipConfig, item.sourceItem, item.calculatedPercent);
  }

  onItemClick(event: any, item: IChartItem) {
    this.legendClick.emit(item.sourceItem)
  }

  legendClass(item: IChartItem): string {
    let ret: string = ' ';
    if (this.selectedItem != null && item.id === this.selectedItem.id) {
      ret += 'legend-selected ';
    }
    if (this.hoverItem != null && item.id === this.hoverItem.id) {
      ret += 'legend-hover ';
    }
    return ret;
  }

}