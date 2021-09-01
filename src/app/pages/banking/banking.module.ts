import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { BankingListComponent } from './banking-list/banking-list.component';
import { BankingAddComponent } from './banking-add/banking-add.component';
import { BankingEditComponent } from './banking-edit/banking-edit.component';

import { ImageService } from 'app/services/image.service';
import { BankingService } from 'app/services/banking.service';
import { CoreConfigService } from '@core/services/config.service';

const routes: Routes = [
  { path: '', component: BankingListComponent },
  { path: 'edit/:id', component: BankingEditComponent },
  { path: 'add', component: BankingAddComponent },
];

@NgModule({
  declarations: [
    BankingListComponent,
    BankingAddComponent,
    BankingEditComponent
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
    BankingService,
    ImageService,
    CoreConfigService,
  ]
})
export class BankingModule { }
