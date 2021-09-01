import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

import { AdminService } from 'app/services/admin.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {

  public title = "ผู้ดูแลระบบ"
  public submitted = false
  public contentHeader: object;
  public dataForm: FormGroup;

  get form() { return this.dataForm.controls; }

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private adminService: AdminService,
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
      let result = await this.adminService.insertAdmin(this.dataForm.value).toPromise()
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "เพิ่มสำเร็จ!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/admin']);
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
      username: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
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
            link: '/admin'
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
