import { Component, OnInit, AfterViewInit, ViewChildren, ViewChild } from '@angular/core';
import { ShortcutInput, AllowIn } from 'ng-keyboard-shortcuts';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ManagementAsistenService } from '../management-asisten.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-management-asisten-add',
  templateUrl: './management-asisten-add.component.html',
  styleUrls: ['./management-asisten-add.component.css']
})
export class ManagementAsistenAddComponent implements OnInit, AfterViewInit {
  shortcuts: ShortcutInput[] = [];
  public aktif = false;
  today = new Date();
  dataForm: any;
  emailValid: boolean = false;
  items: Array<any> = [];
  value: any = {};
  @ViewChildren('email') focus;
  @ViewChild(ModalDirective) public lgModal: ModalDirective;
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authService: AuthService,
    private route: Router,
    private formBuilder: FormBuilder,
    private service: ManagementAsistenService
  ) {
    this.dataForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      nama: ['', Validators.required],
      no_telp: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      aktif: [false],
      id_parent: [this.authService.getParentIdUser(), Validators.required],
      id_role: ['2', Validators.required],
    });

  }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  ngOnInit(): void {
  }

  add() {
    if (this.dataForm.dirty && this.dataForm.valid) {
      this.spinner.show();
      if (this.dataForm.value.aktif === true) {
        this.dataForm.value.aktif = 1;
      } else {
        this.dataForm.value.aktif = 0;
      }
      this.authService.chekEmail({ email: this.dataForm.value.email }, (callback) => {
        if (!callback) {
          this.service.add(this.dataForm.value).subscribe((response) => {
            if (response['meta']['success']) {
              this.toastr.success('Data berhasil ditambahkan', 'Success');
              this.route.navigateByUrl('/master/management-asisten-list');
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

  ngAfterViewInit(): void {
    this.focus.first.nativeElement.focus();
    this.shortcuts.push(
      {
        key: 'ctrl + s',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        command: e => this.add()
      },
      {
        key: 'enter',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        command: e => this.add()
      },
      {
        key: 'ctrl + f',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        command: e => this.openModal()
      }
    );
    this.dataForm.value.aktif = true;
  }
  openModal() {
    this.lgModal.show();
  }

  goBack() {
    this.route.navigateByUrl('master/management-asisten-list');
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  change(event) {
    this.aktif = event;
  }


}
