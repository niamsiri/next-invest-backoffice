import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { DepositListComponent } from './deposit-list/deposit-list.component';

import { TransectionService } from 'app/services/transection.service';
import { CoreConfigService } from '@core/services/config.service';

const routes: Routes = [
  { path: '', component: DepositListComponent },
];


@NgModule({
  declarations: [
    DepositListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    NgbModule,
    FormsModule,
    ComponentsModule,
    ContentHeaderModule
  ],
  providers: [
    TransectionService,
    CoreConfigService,
  ]
})
export class DepositModule { }
