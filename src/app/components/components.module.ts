import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { PaginationComponent } from './pagination/pagination.component';
import { InputUploadImageComponent } from './input-upload-image/input-upload-image.component';

@NgModule({
  declarations: [
    PaginationComponent,
    InputUploadImageComponent
  ],
  exports: [
    PaginationComponent,
    InputUploadImageComponent
  ],
  imports: [
    NgbModule,
    CommonModule
  ]
})
export class ComponentsModule { }
