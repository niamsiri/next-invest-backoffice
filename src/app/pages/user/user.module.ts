import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import { UserService } from 'app/services/user.service';
import { CoreConfigService } from '@core/services/config.service';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'edit/:id', component: UserEditComponent },
];

@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent
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
    UserService,
    CoreConfigService,
  ]
})
export class UserModule { }
