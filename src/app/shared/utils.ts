
export class Utils {

  static roundScale(value: number): number {
    return Math.round(value * 100) / 100;
  }

  static createElementId(prefix: string, index: number): string {
    let id: string = prefix + index;
    return id;
  } 

}
