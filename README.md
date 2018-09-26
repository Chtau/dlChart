# dlChart

Lightweight Angular Chart Library.

The goal of this Library is to have an easy to use and small in size Chart Library.

Currently if both Charts and the Legend is imported the `main.js` for Angular in Production build with Webpack is only **~6kb** bigger which makes it perfect for the usage in a Dashboard or somewhere where you can't / won't lazy load a Chart Library.

The Charts are created with SVG which makes them responsive for every screen resolution and have no extern Library Dependencies.


View [Example and Documentation](https://chtau.github.io/dlChartDoc/)



![Charts](https://raw.githubusercontent.com/Chtau/dlChartHost/master/assets/charts.PNG)


## Features

  * Pie Chart
  * Line Chart
  * Horizontal & Vertical Bar Chart (can also be mirrored)
  * Legend module & service
  * minimal package size (<6kb)
  * no external Libraries
  * SVG
  * Autoscaling
  * customizeable Tooltips
  * click / select / hover Events with additional Data
  * AOT
  * Angular Universal
  


## Install

`npm i dl-chart` [npm](https://www.npmjs.com/package/dl-chart)


## Build

Run `ng build dlChart` to build the library.The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test dlChart` to execute the unit tests via [Karma](https://karma-runner.github.io).

![current Code coverage](https://raw.githubusercontent.com/Chtau/dlChartHost/master/assets/codecoverage.PNG)

## License
[MIT](https://github.com/Chtau/dlChart/blob/master/LICENSE) © [Christoph Taucher](https://github.com/Chtau)

## Version

[Changelog](https://github.com/Chtau/dlChart/blob/master/CHANGELOG.md)

Angular 6+
