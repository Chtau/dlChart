import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';  
import { ChartItemService } from '../services/chart-item.service';
import { ChartItem } from '../models/chartitem.model';
import { Value } from '../models/value.model';
import { LegendConfiguration } from '../models/legendconfiguration.model';
import { Utils } from "../shared/utils";

@Component({  
  selector: 'dl-chart-legend',  
  templateUrl: './legend.component.html',  
  styleUrls: ['./legend.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class LegendComponent implements OnInit, AfterViewInit {

  @Output() legendClick: EventEmitter<Value> = new EventEmitter<Value>();

  items: ChartItem[] = [];

  get chartItems():ChartItem[] {
    return this.items;
  }

  @Input()
  set legendConfiguration(val: LegendConfiguration) {
    this.currentLegendConfiguration = val;
  }
  currentLegendConfiguration: LegendConfiguration = null;

  constructor(private chartItemService: ChartItemService) {
    
  }

  ngOnInit() {
    this.items = this.chartItemService.items;

    this.chartItemService.itemsChange.subscribe(items => {
      this.items = items;
    });
  }

  ngAfterViewInit(): void {

  }

  legendTextValue(item: ChartItem) {
    return Utils.textValue(this.currentLegendConfiguration, item.sourceItem, item.calculatedPercent);
  }

  tooltipTextValue(item: ChartItem) {
    return Utils.textValue(item.sourceItem.tooltipConfig, item.sourceItem, item.calculatedPercent);
  }

  onItemClick(event: any, item: ChartItem) {
    this.legendClick.emit(item.sourceItem)
  }

}