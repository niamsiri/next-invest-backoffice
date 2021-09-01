import { Component, Output, EventEmitter, Input } from '@angular/core';

import { environment } from "environments/environment";

@Component({
  selector: 'input-upload-image',
  templateUrl: './input-upload-image.component.html',
  styleUrls: ['./input-upload-image.component.scss']
})
export class InputUploadImageComponent {

  public defaultPreview: any = "assets/images/avatars/bg_default.jpg"
  public imgUrl = environment.imgUrl
  public imgPreview: any;

  @Input() width;
  @Input() height;
  @Input() round: boolean;
  @Input() text;

  @Input() set setImage(image) {
    this.imgPreview = typeof image == 'string' ? (this.imgUrl + image) : null
  }

  @Output() onUploaded: EventEmitter<any> = new EventEmitter<any>();

  onImageChange(event) {
    let tempFile = <File>event.target['files'][0];
    this.onUploaded.emit(tempFile)
    this.previewImage(tempFile)
  }

  private previewImage(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgPreview = reader.result;
    }
  }

}
