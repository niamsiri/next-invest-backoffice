import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';

import { PackageService } from 'app/services/package.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-package-edit',
  templateUrl: './package-edit.component.html',
  styleUrls: ['./package-edit.component.scss']
})
export class PackageEditComponent implements OnInit {

  public itemId: any = null;
  public title = "แพ็คเกจลงทุน"
  public submitted = false
  public contentHeader: object;
  public dataForm: FormGroup;

  get form() { return this.dataForm.controls; }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private packageService: PackageService,
    private formBuilder: FormBuilder,
  ) {
    this.itemId = this.activatedRoute.snapshot.params["id"];
    this.setForm(null)
  }

  async ngOnInit() {
    this.spinner.show()
    this.setHeader()
    this.getPackageById()
    this.spinner.hide()
  }

  async getPackageById() {
    let result = (await this.packageService.getPackageById(this.itemId).toPromise())?.result
    if (result) {
      this.setForm(result)
    }
  }

  async onSubmit() {
    this.submitted = true
    if (this.dataForm.invalid) {
      return;
    } else {
      this.spinner.show()
      let result = await this.packageService.updatePackage(this.itemId, this.dataForm.value).toPromise()
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "แก้ไขสำเร็จ!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/package']);
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
      title: [data?.title, [Validators.required]],
      detail: [data?.detail],
      creditInvest: [data?.creditInvest, [Validators.required]],
      creditProfit: [data?.creditProfit, [Validators.required]],
      withdrawCredit1: [data?.withdrawCredit1, [Validators.required]],
      withdrawCredit2: [data?.withdrawCredit2, [Validators.required]],
      withdrawCredit3: [data?.withdrawCredit3, [Validators.required]],
      withdrawCredit4: [data?.withdrawCredit4, [Validators.required]],
    }) : this.formBuilder.group({
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
      headerTitle: `แก้ไข${this.title}`,
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
            name: `แก้ไข${this.title}`,
            isLink: false
          }
        ]
      }
    };
  }

}
