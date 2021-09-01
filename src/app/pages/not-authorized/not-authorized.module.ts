import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';

import { NotAuthorizedComponent } from './not-authorized.component';

const routes: Routes = [
  { path: '', component: NotAuthorizedComponent, data: { animation: 'misc' } }
];

@NgModule({
  declarations: [
    NotAuthorizedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule
  ]
})
export class NotAuthorizedModule { }
