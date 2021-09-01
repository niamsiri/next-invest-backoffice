import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';

import { MaintenanceComponent } from './maintenance.component';

const routes: Routes = [
  { path: '', component: MaintenanceComponent, data: { animation: 'misc' } }
];

@NgModule({
  declarations: [
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule
  ]
})
export class MaintenanceModule { }
