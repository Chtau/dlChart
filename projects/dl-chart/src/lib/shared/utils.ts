import { ITextConfiguration } from "../models/textConfiguration.interface";
import { Value } from "../models/value.model";

export class Utils {

  static textValue(config: ITextConfiguration, item: Value, percent: number): string {
    if (config != null) {
      if (config.ValueFunction != null) {
        return config.ValueFunction(item, percent);
      } else {
        if (config.HideValue) {
          return item.name;  
        } else {
          return item.name + ' ' + item.value;
        }
      }
    }
    return item.name + ' (' + item.value + ')';
  }

  static roundScale(value: number): number {
    return Math.round(value * 100) / 100;
  }

  static createElementId(prefix: string, index: number): string {
    let id: string = prefix + index;
    return id;
  } 

}
