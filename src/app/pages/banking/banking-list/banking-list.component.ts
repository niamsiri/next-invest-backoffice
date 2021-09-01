import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from "ngx-spinner";
import { BankingService } from 'app/services/banking.service';

import Swal from 'sweetalert2';

import { environment } from "environments/environment";

@Component({
  selector: 'app-banking-list',
  templateUrl: './banking-list.component.html',
  styleUrls: ['./banking-list.component.scss']
})
export class BankingListComponent implements OnInit {

  public title = "บัญชีฝากเงิน"
  public dataList = []
  public imgUrl = environment.imgUrl

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
    private bankingService: BankingService
  ) { }

  async ngOnInit() {
    this.spinner.show()
    await this.getDataList()
    this.spinner.hide()
  }

  async getDataList() {
    let result = (await this.bankingService.getBankList(this.params).toPromise())?.result
    this.dataList = result?.data
    console.log(this.dataList)
    this.pagin.pages = Math.ceil(result?.total / this.params?.limit)
    this.pagin.total = result?.total
  }

  async updateStatusItem(id, status) {
    this.spinner.show()
    let result = await this.bankingService.updateStatusBank(id, { status: status }).toPromise()
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

  async deleteItem(id) {
    Swal.fire({
      title: 'คุณต้องการลบหรือไม่?',
      text: "หากกดตกลงข้อมูลจะถูกลบและไม่สามารถกู้คืนได้อีก!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
    }).then(async confirm => {
      if (confirm.value) {
        this.spinner.show()
        Promise.all([
          await this.bankingService.deleteBank(id).toPromise(),
          await this.getDataList(),
        ])
        this.spinner.hide()
      }
    })
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
