import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from 'app/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-invest-list',
  templateUrl: './invest-list.component.html',
  styleUrls: ['./invest-list.component.scss']
})
export class InvestListComponent implements OnInit {

  public title = "รายการลงทุน"
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
    let result = (await this.userService.getListInvestPackage(this.params).toPromise())?.result
    this.dataList = result?.data
    this.pagin.pages = Math.ceil(result?.total / this.params?.limit)
    this.pagin.total = result?.total
  }

  async updateWithdrawStatus(id, lesson) {
    let result = null
    if (lesson == 1) {
      result = await this.userService.updateStatusInvest(id, { status: true, type: 1 }).toPromise()
    } else if (lesson == 2) {
      result = await this.userService.updateStatusInvest(id, { status: true, type: 2 }).toPromise()
    } else if (lesson == 3) {
      result = await this.userService.updateStatusInvest(id, { status: true, type: 3 }).toPromise()
    } else if (lesson == 4) {
      result = await this.userService.updateStatusInvest(id, { status: true, type: 4 }).toPromise()
    }
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
