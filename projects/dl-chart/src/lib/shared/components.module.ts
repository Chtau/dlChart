import { NgModule } from '@angular/core';
import { YAxisComponent } from '../shared/yaxis.component';
import { CommonModule } from '@angular/common';
import { XAxisComponent } from './xaxis.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    YAxisComponent,
    XAxisComponent
  ],
  providers: [
  ],
  entryComponents: [
  ],
  exports: [
    YAxisComponent,
    XAxisComponent
  ]
})
export class ComponentsModule { }