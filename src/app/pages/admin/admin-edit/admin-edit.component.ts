import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';

import { AdminService } from 'app/services/admin.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {

  public title = "ผู้ดูแลระบบ"
  public itemId: any = null;
  public submitted = false
  public contentHeader: object;
  public dataForm: FormGroup;
  public roles = []

  get form() { return this.dataForm.controls; }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    this.itemId = this.activatedRoute.snapshot.params["id"];
    this.setForm(null)
  }

  async ngOnInit() {
    this.spinner.show()
    this.setHeader()
    await this.getUserById()
    this.spinner.hide()
  }

  async getUserById() {
    let result = (await this.adminService.getAdminById(this.itemId).toPromise())?.result
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
      let result = await this.adminService.updateNameAdmin(this.itemId, this.dataForm.value).toPromise()
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "แก้ไขสำเร็จ!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/admin']);
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
      firstName: [data?.firstName, [Validators.required]],
      lastName: [data?.lastName, [Validators.required]],
    }) : this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
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
            link: '/admin'
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
