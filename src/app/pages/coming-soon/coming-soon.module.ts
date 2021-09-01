import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';

import { ComingSoonComponent } from './coming-soon.component';

const routes: Routes = [
  { path: '', component: ComingSoonComponent, data: { animation: 'misc' } }
];

@NgModule({
  declarations: [
    ComingSoonComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule
  ]
})
export class ComingSoonModule { }
