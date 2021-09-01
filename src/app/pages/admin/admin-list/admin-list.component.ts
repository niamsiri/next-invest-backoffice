import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";
import { AdminService } from 'app/services/admin.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  public title = "ผู้ดูแลระบบ"
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
    private adminService: AdminService
  ) { }

  async ngOnInit() {
    this.spinner.show()
    await this.getDataList()
    this.spinner.hide()
  }

  async getDataList() {
    let result = (await this.adminService.getAdminList(this.params).toPromise())?.result
    this.dataList = result?.data
    this.pagin.pages = Math.ceil(result?.total / this.params?.limit)
    this.pagin.total = result?.total
  }

  async resetPassword(id) {
    this.spinner.show()
    let result = await this.adminService.resetAdminPassword(id).toPromise()
    await this.getDataList()
    this.spinner.hide()
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "เปลี่ยนรหัสผ่านสำเร็จ!",
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  async updateStatusItem(id, status) {
    this.spinner.show()
    let result = await this.adminService.updateStatusAdmin(id, { status: status }).toPromise()
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
