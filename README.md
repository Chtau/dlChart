# dlChart

Lightweight Angular Chart Library.

The goal of this Library is to have an easy to use and small in size Chart Library.

Currently if both Charts and the Legend is imported the `main.js` for Angular in Production build with Webpack is only **~6kb** bigger which makes it perfect for the usage in a Dashboard or somewhere where you can't / won't lazy load a full blown Chart Library.

The Charts are created with SVG which makes them responsive for every screen resolution and have no extern Library Dependencies.


[Example](https://chtau.github.io/dlChartHost/)

![Import Assembly in Blazor](https://raw.githubusercontent.com/Chtau/dlChartHost/master/assets/charts.PNG)

## Install

`npm i dl-chart` [npm](https://www.npmjs.com/package/dl-chart)

## Usage

Add `DlChartModule` to your module's imports
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { DlChartModule } from "dl-chart";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DlChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
And then use it in your component
```html
<div style="text-align:center">
  <h1>
    dlChart Demo
  </h1>
</div>
<div style="text-align: center;">
  <div style="display: inline-block; width: 400px; height: 400px;text-align:center;margin: 50px;">
    <h2>Pie Chart</h2>
    <input (keyup)="onKey($event)" placeholder="Filter to Chart ('3' shows only two Values)">
    <dl-pie-chart [chartid]="'test-chart'" [values]="filterValues"></dl-pie-chart>
    <dl-chart-legend [chartid]="'test-chart'"></dl-chart-legend>
  </div>

  <div style="display: inline-block; width: 400px; height: 400px;text-align:center;margin: 50px;">
    <h2>Bar Chart</h2>
    <input (keyup)="onKeyBar($event)" placeholder="Filter to Chart ('3' shows only two Values)">
    <dl-bar-chart [chartid]="'test-chart-bar'" [values]="filterValuesBar"></dl-bar-chart>
    <dl-chart-legend [chartid]="'test-chart-bar'"></dl-chart-legend>
  </div>
</div>
```

Every Component can be used as often as you like and even in different Components. You can have one Chart which has multiple Legends in different Components (Charts and Legend are Identified with the `chartid`).

## Options

The public API exposes `DlPieChartModule`, `DlBarChartModule` and `DlLegendModule` for optimal Tree shaking if you don't want to import the complete libary with `DlChartModule`.

### shared Properties between Pie and Bar Chart

Set the Datasource

Property | Type | Required
--- | --- | ---
`[values]` | Value[] | Required

Chart Identification (required when multiple Charts are used with Legends)

Property | Type 
--- | --- 
`[chartid]` | string 

default Tooltip Configuration for the Chart

Property | Type 
--- | --- 
`[tooltipConfiguration]` | TooltipConfiguration 

allow Slice/Bar selection

Property | Type
--- | --- 
`[allowSelect]` | boolean

Slice/Bar selected

Event | Type 
--- | --- 
`(valueSelect)` | Value 

Slice/Bar deselected

Event | Type 
--- | --- 
`(valueDeselect)` | Value 

Slice/Bar clicked

Event | Type 
--- | --- 
`(valueClick)` | Value 

Slice/Bar value item changed

Event | Type 
--- | --- 
`(valueChange)` | Value 

#### Bar Chart Properties

set the Text label for the Y Axis (Value scale)

Property | Type | default
--- | --- | ---
`[scaleLabel]` | string | 'Values'

#### Legend Properties

configurate the Display Text of the Legend

Property | Type | default
--- | --- | ---
`[legendConfiguration]` | LegendConfiguration | null


### Datatypes

#### TooltipConfiguration

Property | Type | default | description
--- | --- | --- | ---
`HideValue` | boolean | false | hides value in the Tooltip Text
`ValueFunction` | (n: Value, percent: number) => string | null | function to return the Tooltip Text

#### Value

Property | Type | default | description
--- | --- | --- | ---
`name` | string |  | Name text label
`value` | number |  | Number value
`color` | string |  | Display Color (css compatible Color definition)
`cssClass` | string | null | additional css class
`tooltipConfig` | TooltipConfiguration | null | Tooltip configuration only for this value Element
`data` | any | null | additional Data (this data can later be accessed from the events)

#### LegendConfiguration

Property | Type | default | description
--- | --- | --- | ---
`HideValue` | boolean | false | hides value in the Legend text
`ValueFunction` | (n: Value, percent: number) => string | null | function to return the Legend text


### CSS

The Tooltip can be overriden with the CSS Id `dlChartTooltip`

Slice in the Pie Chart can be overriden with the CSS Id `chart-slice-0` (the number is the index of the element)

Bars in the Bar Chart can be override with the CSS Id `chart-bar-0` (the number is the index of the element)




## Build

Run `ng build dlChart` to build the library.The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test dlChart` to execute the unit tests via [Karma](https://karma-runner.github.io).

## License
[MIT](https://github.com/Chtau/dlChart/blob/master/LICENSE) © [Christoph Taucher](https://github.com/Chtau)

## Version

[Changelog](https://github.com/Chtau/dlChart/blob/master/CHANGELOG.md)

Angular 6+
