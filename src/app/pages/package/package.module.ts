import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { PackageListComponent } from './package-list/package-list.component';
import { PackageAddComponent } from './package-add/package-add.component';
import { PackageEditComponent } from './package-edit/package-edit.component';

import { PackageService } from 'app/services/package.service';
import { CoreConfigService } from '@core/services/config.service';

const routes: Routes = [
  { path: '', component: PackageListComponent },
  { path: 'edit/:id', component: PackageEditComponent },
  { path: 'add', component: PackageAddComponent },
];

@NgModule({
  declarations: [
    PackageListComponent,
    PackageAddComponent,
    PackageEditComponent
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
    PackageService,
    CoreConfigService,
  ]
})
export class PackageModule { }
