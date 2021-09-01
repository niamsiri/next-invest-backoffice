import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'app/services/auth.service';
import { CoreConfigService } from '@core/services/config.service';
import { NgxSpinnerService } from "ngx-spinner";

import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public coreConfig: any;
  public passwordTextType: boolean;
  public loading = false;
  public submitted = false;
  public error = false;

  private unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private coreConfigService: CoreConfigService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {
    this.unsubscribeAll = new Subject();
    this.coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  get form() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.setCoreConfig()
    this.setLoginForm()
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  setCoreConfig() {
    this.coreConfigService.config.pipe(takeUntil(this.unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  setLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ["admin", [Validators.required]],
      password: ["nPHnj5LlU4", Validators.required]
    });
  }

  async onSubmit() {
    this.submitted = true
    if (this.loginForm.get("username").value != "" && this.loginForm.get("password").value != "") {
      this.spinner.show()
      let response = await this.authService.login(this.loginForm.value).toPromise()
      this.spinner.hide()
      if (response?.success) {
        let payload = response?.result
        this.authService.saveToken(payload.token)
        this.authService.saveUserInfo(payload.info)
        this.router.navigate(['/dashboard']);
      } else {
        this.error = true
      }
    }
  }
}
