import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { AdminAddComponent } from './admin-add/admin-add.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminListComponent } from './admin-list/admin-list.component';

import { AdminService } from 'app/services/admin.service';
import { CoreConfigService } from '@core/services/config.service';

const routes: Routes = [
  { path: '', component: AdminListComponent },
  { path: 'edit/:id', component: AdminEditComponent },
  { path: 'add', component: AdminAddComponent },
];

@NgModule({
  declarations: [
    AdminAddComponent,
    AdminEditComponent,
    AdminListComponent
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
    AdminService,
    CoreConfigService,
  ]
})
export class AdminModule { }
