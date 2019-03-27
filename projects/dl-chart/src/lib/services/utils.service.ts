import { Injectable } from '@angular/core';
import { ITextConfiguration } from '../models/textConfiguration.interface';
import { IValue } from '../models/value.interface';
import { Value } from '../models/value.model';
import { Point } from '../models/point.model';
import { Axis } from '../models/axis.model';

@Injectable()
export class UtilsService {

  constructor() {

  }

  textValue(config: ITextConfiguration, item: IValue, percent: number): string {
    if (config != null) {
      if (config.ValueFunction != null) {
        return config.ValueFunction(item, percent);
      } else {
        if (config.HideValue) {
          return item.name;
        } else {
          return this.getTextValue(item);
        }
      }
    }
    return this.getTextValue(item);
  }

  private getTextValue(item: IValue): string {
    var valueItem = item as Value;
    if (valueItem.value != undefined) {
      return item.name + ' (' + valueItem.value + ')';
    }
    var pointItem = item as Point;
    if (pointItem.yValue != undefined) {
      return item.name + ' (' + pointItem.yValue + ', ' + pointItem.xValue + ')';
    }
    return item.name;
  }

  roundScale(value: number): number {
    return Math.round(value * 100) / 100;
  }

  createElementId(prefix: string, index: number): string {
    let id: string = prefix + index;
    return id;
  }

  createYAxis(minValue: number, valueSteps: number, singleStepValue: number, 
    singleStep: number, maxValue: number): Axis[] {
    let axis: Axis[] = [];
    axis.push(
      {
        text: this.onFormatUnkownAxisValue(minValue),
        position: 100
      }
    );
    let index = 1;
    for (index = 1; index <= (valueSteps - 1); index++) {
      var currentValue = this.roundScale(minValue + (singleStepValue * index));
      var step = 100 - this.roundScale(singleStep * index);
      axis.push(
        {
          text: this.onFormatUnkownAxisValue(currentValue),
          position: step
        }
      )
    }
    axis.push(
      {
        text: this.onFormatUnkownAxisValue(maxValue),
        position: 0
      }
    );
    return axis;
  }

  private onFormatUnkownAxisValue(value: any): string {
    if (value != undefined && value != null && !isNaN(value) && value != Infinity && value != -Infinity) {
      return value.toString();
    } else {
      return "";
    }
  }

}