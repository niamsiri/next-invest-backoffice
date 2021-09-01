import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

import { PackageService } from 'app/services/package.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-package-add',
  templateUrl: './package-add.component.html',
  styleUrls: ['./package-add.component.scss']
})
export class PackageAddComponent implements OnInit {

  public title = "แพ็คเกจลงทุน"
  public submitted = false
  public contentHeader: object;
  public dataForm: FormGroup;

  get form() { return this.dataForm.controls; }

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private packageService: PackageService,
    private formBuilder: FormBuilder,
  ) {
    this.setForm()
  }

  async ngOnInit() {
    this.spinner.show()
    this.setHeader()
    this.spinner.hide()
  }

  async onSubmit() {
    this.submitted = true
    if (this.dataForm.invalid) {
      return;
    } else {
      this.spinner.show()
      let result = await this.packageService.insertPackage(this.dataForm.value).toPromise()
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "เพิ่มสำเร็จ!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/package']);
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
      title: ["", [Validators.required]],
      detail: [""],
      creditInvest: ["", [Validators.required]],
      creditProfit: ["", [Validators.required]],
      withdrawCredit1: [null, [Validators.required]],
      withdrawCredit2: [null, [Validators.required]],
      withdrawCredit3: [null, [Validators.required]],
      withdrawCredit4: [null, [Validators.required]],
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
            link: '/package'
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
