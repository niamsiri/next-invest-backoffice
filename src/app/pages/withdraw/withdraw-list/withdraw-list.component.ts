import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";
import { TransectionService } from 'app/services/transection.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-withdraw-list',
  templateUrl: './withdraw-list.component.html',
  styleUrls: ['./withdraw-list.component.scss']
})
export class WithdrawListComponent implements OnInit {

  public title = "รายการฝากเงิน"
  public dataList = []

  public params = {
    status: null,
    limit: 10,
    page: 1
  }

  public pagin = {
    total: 0,
    pages: 0
  }

  constructor(
    private spinner: NgxSpinnerService,
    private transectionService: TransectionService
  ) { }

  async ngOnInit() {
    this.spinner.show()
    await this.getDataList()
    this.spinner.hide()
  }

  async getDataList() {
    let result = (await this.transectionService.getWithdrawList(this.params).toPromise())?.result
    this.dataList = result?.data
    this.pagin.pages = Math.ceil(result?.total / this.params?.limit)
    this.pagin.total = result?.total
  }

  async updateStatusItem(id, status) {
    this.spinner.show()
    let result = await this.transectionService.approveWithdraw(id, {
      status: status,
    }).toPromise()
    await this.getDataList()
    this.spinner.hide()
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "อนุมัติสำเร็จ!",
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "อนุมัติไม่สำเร็จ!",
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  async approveDeposit(id) {
    this.spinner.show()
    let result = await this.transectionService.approveWithdraw(id, {
      status: "APPROVE"
    }).toPromise()
    await this.getDataList()
    this.spinner.hide()
    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "อนุมัติสำเร็จ!",
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "อนุมัติไม่สำเร็จ!",
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
