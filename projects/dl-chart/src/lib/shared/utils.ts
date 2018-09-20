import { ITextConfiguration } from "../models/textConfiguration.interface";
import { Value } from "../models/value.model";
import { IValue } from "../models/value.interface";

export class Utils {

  static textValue(config: ITextConfiguration, item: IValue, percent: number): string {
    if (config != null) {
      if (config.ValueFunction != null) {
        return config.ValueFunction(item, percent);
      } else {
        if (config.HideValue) {
          return item.name;  
        } else {
          if (item["value"]) {
            return item.name + ' (' + item["value"] + ')';
          } else if (item["yValue"]) {
            return item.name + ' (' + item["yValue"] + ')';
          } else {
            return item.name;
          }
        }
      }
    }
    if (item["value"]) {
      return item.name + ' (' + item["value"] + ')';
    } else if (item["yValue"]) {
      return item.name + ' (' + item["yValue"] + ')';
    } else {
      return item.name;
    }
  }

  static roundScale(value: number): number {
    return Math.round(value * 100) / 100;
  }

  static createElementId(prefix: string, index: number): string {
    let id: string = prefix + index;
    return id;
  } 

}
