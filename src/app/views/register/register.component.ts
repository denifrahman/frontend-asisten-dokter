import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  dataForm: any;
  registrasiPage: boolean = false;
  succesRegistrasiPage: boolean = true;
  invalid = '';
  emailValid: boolean = false;
  constructor(
    private route: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private service: RegisterService
  ) {
    this.dataForm = this.formBuilder.group({
      nama: ['', [Validators.required]],
      no_telp: ['', Validators.required],
      id_role: ['1'],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repassword: ['', [Validators.required, Validators.minLength(8)]],
      aktif: ['1']
    });
  }

  register() {
    this.spinner.show();
    if (this.dataForm.dirty && this.dataForm.valid) {
      this.authService.chekEmail({ email: this.dataForm.value.email }, (callback) => {
        if (!callback) {
          this.service.add(this.dataForm.value).subscribe((response) => {
            if (response['meta']['success']) {
              this.toastr.success('Data berhasil ditambahkan', 'Success');
              this.registrasiPage = true;
              this.succesRegistrasiPage = false;
              this.spinner.hide();
            } else {
              this.toastr.warning(response['meta'].message, 'Warning');
              this.spinner.hide();
            }
          });
          this.emailValid = false;
        } else {
          this.emailValid = true;
          this.spinner.hide();
          console.log('notif');
        }
      });
    }
  }

  masuk() {
    this.route.navigateByUrl('/login');
  }

  repasswordChange(value) {
    console.log(value);
  }

}
