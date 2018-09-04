import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';  
import { ChartItemService } from '../services/chart-item.service';
import { ChartItem } from '../models/chartitem.model';

@Component({  
  selector: 'dl-chart-legend',  
  templateUrl: './legend.component.html',  
  styleUrls: ['./legend.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class LegendComponent implements OnInit, AfterViewInit {

  items: ChartItem[] = [];

  get chartItems():ChartItem[] {
    return this.items;
  }

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

}