import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';

import { InvestListComponent } from './invest-list/invest-list.component';

import { UserService } from 'app/services/user.service';

const routes: Routes = [
  { path: '', component: InvestListComponent },
];

@NgModule({
  declarations: [
    InvestListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    NgbModule,
    FormsModule,
    ComponentsModule
  ],
  providers: [
    UserService
  ]
})
export class InvestModule { }
