import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { NgxSpinnerService } from "ngx-spinner";
import { TransectionService } from 'app/services/transection.service';

import Swal from 'sweetalert2';

import { environment } from "environments/environment";

@Component({
  selector: 'app-deposit-list',
  templateUrl: './deposit-list.component.html',
  styleUrls: ['./deposit-list.component.scss']
})
export class DepositListComponent implements OnInit {

  public title = "รายการฝากเงิน"
  public dataList = []
  public imgUrl = environment.imgUrl

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
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private transectionService: TransectionService
  ) { }

  async ngOnInit() {
    this.spinner.show()
    await this.getDataList()
    this.spinner.hide()
  }

  async getDataList() {
    let result = (await this.transectionService.getDepositList(this.params).toPromise())?.result
    this.dataList = result?.data
    console.log(this.dataList)
    this.pagin.pages = Math.ceil(result?.total / this.params?.limit)
    this.pagin.total = result?.total
  }

  async approveDeposit(id, credit) {
    if (credit > 0) {
      this.spinner.show()
      let result = await this.transectionService.approveDeposit(id, {
        status: "APPROVE",
        credit: credit
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
  }

  async pageChange(event) {
    if (event?.page) {
      this.params.page = event?.page
      this.spinner.show()
      await this.getDataList()
      this.spinner.hide()
    }
  }

  modalOpen(modalBasic) {
    this.modalService.open(modalBasic, {
      windowClass: 'modal'
    });
  }

}
