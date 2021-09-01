import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

import { BankingService } from 'app/services/banking.service';
import { ImageService } from 'app/services/image.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-banking-add',
  templateUrl: './banking-add.component.html',
  styleUrls: ['./banking-add.component.scss']
})
export class BankingAddComponent implements OnInit {

  public title = "บัญชีฝากเงิน"
  public submitted = false
  public contentHeader: object;
  public dataForm: FormGroup;

  get form() { return this.dataForm.controls; }

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private bankingService: BankingService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
  ) {
    this.setForm()
  }

  async ngOnInit() {
    this.spinner.show()
    this.setHeader()
    this.spinner.hide()
  }

  onChangeImage(event) {
    this.dataForm.controls['bankLogo'].setValue(event);
  }

  async uploadImage() {
    let img = this.dataForm.controls['bankLogo'].value
    if (typeof img == "object" && img) {
      let result = (await this.imageService.insertImage(img).toPromise())?.result
      this.dataForm.controls['bankLogo'].setValue(result?.imgName);
    }
  }

  async onSubmit() {
    this.submitted = true
    if (this.dataForm.invalid) {
      return;
    } else {
      this.spinner.show()
      await this.uploadImage();
      let result = await this.bankingService.insertBank(this.dataForm.value).toPromise()
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "เพิ่มสำเร็จ!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/banking']);
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถเพิ่มได้!",
          text: result?.error?.desc,
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.spinner.hide()
    }
  }

  private setForm() {
    this.dataForm = this.formBuilder.group({
      bankLogo: [""],
      bankName: ["", [Validators.required]],
      accountNumber: ["", [Validators.required]],
      accountName: ["", [Validators.required]],
    })
  }

  setHeader() {
    this.contentHeader = {
      headerTitle: `เพิ่ม${this.title}`,
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: this.title,
            isLink: true,
            link: '/banking'
          },
          {
            name: `เพิ่ม${this.title}`,
            isLink: false
          }
        ]
      }
    };
  }

}
