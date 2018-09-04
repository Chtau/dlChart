import { Injectable, Input, EventEmitter, Output } from '@angular/core';
import { ChartItem } from '../models/chartitem.model';

@Injectable()
export class ChartItemService {

  @Output() itemsChange: EventEmitter<ChartItem[]> = new EventEmitter<ChartItem[]>();
  @Input()
  get items() {
    return this.currentItems;
  }
  
  set items(val) {
    this.currentItems = val;
    this.itemsChange.emit(this.currentItems);
  }
  currentItems: ChartItem[] = [];
  
  constructor() { 

  }

}