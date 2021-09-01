import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { ToastContainerComponent } from 'app/components/toasts/toast-container/toast-container.component';

@NgModule({
  declarations: [
    ToastContainerComponent
  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    NgbModule,
    ContentHeaderModule
  ],
  exports: [
    ToastContainerComponent
  ]
})
export class ToastsModule { }
