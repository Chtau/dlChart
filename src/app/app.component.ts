import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Value, TooltipConfiguration } from '../../projects/dl-chart/src/public_api';
import { ChartOrientation } from '../../projects/dl-chart/src/public_api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  values: Value[] = [
    new Value('Red', 5, 'Red', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    new Value('Blue', 3, 'Blue'),
    new Value('Green', 10, 'Green', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' (' + val.value + ')' })),
    new Value('Orange', 3, 'Orange'),
    new Value('Grey', 7, 'Grey'),
  ];

  values1: Value[] = [
    new Value('Red', null, 'Red', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    new Value('Blue', undefined, 'Blue'),
    // new Value('Green', 10, 'Green', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' (' + val.value + ')' })),
    new Value('Orange', 3, 'Orange'),
  ];

  filterValues: Value[] = this.values;
  filterValuesBar: Value[] = this.values;

  onKey(event: any) {
    let inputValue = event.target.value;
    this.filterValues = this.values.filter(val => {
      if (inputValue === undefined || inputValue === '') {
        return true;
      }
      if (val.name === inputValue || val.value.toString() === inputValue) {
        return true;
      }
      return false;
    });
  }

  onKeyBar(event: any) {
    let inputValue = event.target.value;
    this.filterValuesBar = this.values.filter(val => {
      if (inputValue === undefined || inputValue === '') {
        return true;
      }
      if (val.name === inputValue || val.value.toString() === inputValue) {
        return true;
      }
      return false;
    });
  }

  selectedOrientation: ChartOrientation = ChartOrientation.Bottom;
  currentSteps: number = 10;
  leftScaleAxis: boolean = true;
  rightScaleAxis: boolean = false;
  barOffset: number = 13;
}
