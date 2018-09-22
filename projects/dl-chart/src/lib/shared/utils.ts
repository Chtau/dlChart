import { ITextConfiguration } from "../models/textConfiguration.interface";
import { Value } from "../models/value.model";
import { IValue } from "../models/value.interface";
import { Point } from "../models/point.model";

export class Utils {

  static textValue(config: ITextConfiguration, item: IValue, percent: number): string {
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

  private static getTextValue(item: IValue): string {
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

  static roundScale(value: number): number {
    return Math.round(value * 100) / 100;
  }

  static createElementId(prefix: string, index: number): string {
    let id: string = prefix + index;
    return id;
  } 

}
