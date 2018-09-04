import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';  
import { ChartItemService } from '../services/chart-item.service';
import { ChartItem } from '../models/chartitem.model';
import { Value } from '../models/value.model';
import { LegendConfiguration } from '../models/legendconfiguration.model';

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
    if (this.currentLegendConfiguration != null) {
      if (this.currentLegendConfiguration.ValueFunction != null) {
        return this.currentLegendConfiguration.ValueFunction(item.sourceItem, item.calculatedPercent);
      } else {
        if (this.currentLegendConfiguration.HideValue) {
          return item.sourceItem.name;  
        } else {
          return item.sourceItem.name + ' ' + item.sourceItem.value;
        }
      }
    }
    return item.sourceItem.name;
  }

  tooltipTextValue(item: ChartItem) {
    if (item.sourceItem.tooltipConfig != null) {
      if (item.sourceItem.tooltipConfig.ValueFunction != null) {
        return item.sourceItem.tooltipConfig.ValueFunction(item.sourceItem, item.calculatedPercent);
      } else {
        if (item.sourceItem.tooltipConfig.HideValue) {
          return item.sourceItem.name;  
        } else {
          return item.sourceItem.name + ' ' + item.sourceItem.value;
        }
      }
    }
    return item.sourceItem.name;
  }

  onItemClick(event: any, item: ChartItem) {
    this.legendClick.emit(item.sourceItem)
  }

}