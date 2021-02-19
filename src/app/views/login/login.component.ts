import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ShortcutInput, AllowIn } from 'ng-keyboard-shortcuts';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {
  shortcuts: ShortcutInput[] = [];
  dataForm: any;
  constructor(
    private spinner: NgxSpinnerService,
    private route: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private service: AuthService
  ) {
    this.dataForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  ngOnInit() {
    this.spinner.hide();
  }
  login() {
    this.spinner.show();
    if (this.dataForm.valid) {
      this.service.login(this.dataForm.value).subscribe(async (response) => {
        console.log(response);
        if (response['status']) {
          await sessionStorage.setItem('session_auth', JSON.stringify(response));
          await sessionStorage.setItem('tokenAccess', response['token'].tokenAccess);
          await sessionStorage.setItem('tokenRefresh', response['token'].tokenRefresh);
          if (sessionStorage.getItem('tokenAccess') != null) {
            console.log(sessionStorage.getItem('tokenAccess'));
            this.route.navigateByUrl('/dashboard');
            this.toastr.success('Selamat datang dokter', 'Login berhasil');
            this.spinner.hide();
          }
        } else {
          this.toastr.error('Kombinasi email dan password anda tidak cocok', 'Login gagal');
          this.spinner.hide();
        }
        // window.location.href = '/';
      });
    }
  }
  ngAfterViewInit(): void {
    this.shortcuts.push(
      {
        key: 'enter',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        command: e => this.login()
      },
    );
    this.dataForm.value.agama_aktif = true;
  }
}
