import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';

import { BankingService } from 'app/services/banking.service';
import { ImageService } from 'app/services/image.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-banking-edit',
  templateUrl: './banking-edit.component.html',
  styleUrls: ['./banking-edit.component.scss']
})
export class BankingEditComponent implements OnInit {

  public itemId: any = null;
  public title = "บัญชีฝากเงิน"
  public submitted = false
  public contentHeader: object;
  public dataForm: FormGroup;

  get form() { return this.dataForm.controls; }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private bankingService: BankingService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
  ) {
    this.itemId = this.activatedRoute.snapshot.params["id"];
    this.setForm(null)
  }

  async ngOnInit() {
    this.spinner.show()
    this.setHeader()
    this.getBankById()
    this.spinner.hide()
  }

  async getBankById() {
    let result = (await this.bankingService.getBankById(this.itemId).toPromise())?.result
    if (result) {
      this.setForm(result)
    }
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
      let result = await this.bankingService.updateBank(this.itemId, this.dataForm.value).toPromise()
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "แก้ไขสำเร็จ!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/banking']);
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถแก้ไขได้!",
          text: result?.error?.desc,
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.spinner.hide()
    }
  }

  private setForm(data) {
    this.dataForm = data ? this.formBuilder.group({
      bankLogo: [data?.bankLogo],
      bankName: [data?.bankName, [Validators.required]],
      accountNumber: [data?.accountNumber, [Validators.required]],
      accountName: [data?.accountName, [Validators.required]],
    }) : this.formBuilder.group({
      bankLogo: [""],
      bankName: ["", [Validators.required]],
      accountNumber: ["", [Validators.required]],
      accountName: ["", [Validators.required]],
    })
  }

  setHeader() {
    this.contentHeader = {
      headerTitle: `แก้ไข${this.title}`,
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
            name: `แก้ไข${this.title}`,
            isLink: false
          }
        ]
      }
    };
  }

}
