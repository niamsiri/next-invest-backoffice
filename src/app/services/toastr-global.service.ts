import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable()

export class ToastrGlobalService {

    constructor(
        private toastr: ToastrService,
    ) { }

    toastrSuccess(message) {
        this.toastr.success(message, 'Success!', {
            toastClass: 'toast ngx-toastr',
            closeButton: true
        });
    }

    toastrInfo(message) {
        this.toastr.info(message, 'Info!', {
            toastClass: 'toast ngx-toastr',
            closeButton: true
        });
    }

    toastrWarning(message) {
        this.toastr.warning(message, 'Warning!', {
            toastClass: 'toast ngx-toastr',
            closeButton: true
        });
    }

    toastrError(message) {
        this.toastr.error(message, 'Danger!', {
            toastClass: 'toast ngx-toastr',
            closeButton: true
        });
    }

}