import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from 'app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public title = "สมาชิก"
  public dataList = []

  public params = {
    limit: 10,
    page: 1
  }

  public pagin = {
    total: 0,
    pages: 0
  }

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.spinner.show()
    await this.getDataList()
    this.spinner.hide()
  }

  async getDataList() {
    let result = (await this.userService.getUserList(this.params).toPromise())?.result
    this.dataList = result?.data
    this.pagin.pages = Math.ceil(result?.total / this.params?.limit)
    this.pagin.total = result?.total
  }

  async updateStatusItem(id, status) {
    this.spinner.show()
    let result = await this.userService.updateStatusUser(id, { status: status }).toPromise()
    await this.getDataList()
    this.spinner.hide()
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "เปลี่ยนสถานะสำเร็จ!",
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  async pageChange(event) {
    if (event?.page) {
      this.params.page = event?.page
      this.spinner.show()
      await this.getDataList()
      this.spinner.hide()
    }
  }

}
