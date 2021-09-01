import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public title = "สมาชิก"
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
    private userService: UserService,
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
    let result = (await this.userService.getUserById(this.itemId).toPromise())?.result
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
      let result = await this.userService.updateUser(this.itemId, this.dataForm.value).toPromise()
      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "แก้ไขสำเร็จ!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/user']);
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
      bankName: [data?.bankName, [Validators.required]],
      accountNumber: [data?.accountNumber, [Validators.required]],
      accountName: [data?.accountName, [Validators.required]],
    }) : this.formBuilder.group({
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
            link: '/user'
          },
          {
            name: `แก้ไข${this.title}`,
            isLink: false
          }
        ]
      }
    };
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
