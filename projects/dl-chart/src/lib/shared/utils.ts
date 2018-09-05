import { ITextConfiguration } from "../models/textConfiguration.interface";
import { Value } from "../models/value.model";

export class Utils {

  static textValue(config: ITextConfiguration, item: Value, percent: number) {
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
    return item.name;
  }

}
