import { Component, OnInit, AfterViewInit, ViewChildren, ViewChild } from '@angular/core';
import { ShortcutInput, AllowIn } from 'ng-keyboard-shortcuts';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ManagementAsistenService } from '../management-asisten.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-management-asisten-edit',
  templateUrl: './management-asisten-edit.component.html',
  styleUrls: ['./management-asisten-edit.component.css']
})
export class ManagementAsistenEditComponent implements OnInit, AfterViewInit {
  shortcuts: ShortcutInput[] = [];
  public aktif = false;
  today = new Date();
  dataForm: any;
  dataPassword: any;
  id;
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
    private paramRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: ManagementAsistenService
  ) {
    this.dataForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      nama: ['', Validators.required],
      no_telp: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      aktif: [false],
      id_parent: [this.authService.getParentIdUser(), Validators.required],
      id_role: ['2', Validators.required],
    });
    this.dataPassword = this.formBuilder.group({
      password: ['', [Validators.minLength(8)]],
    });
    this.paramRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  isCollapsedPassword: boolean = false;

  iconCollapsePassword: string = 'icon-arrow-down';

  ngOnInit(): void {
    this.findOneById();
  }

  findOneById() {
    this.spinner.show();
    const param = {
      'id': this.id
    };
    this.service.findOneById(param).subscribe(response => {
      const result = response['data'];
      this.dataForm.setValue({
        email: result.email,
        nama: result.nama,
        no_telp: result.no_telp,
        aktif: result.aktif === 1 ? true : false,
        id_parent: result.id_parent,
        id_role: result.id_role,
      });
      console.log(result.aktif);
      this.spinner.hide();
    });
  }

  update() {
    this.spinner.show();
    if (this.dataForm.value.aktif === true) {
      this.dataForm.value.aktif = 1;
    } else {
      this.dataForm.value.aktif = 0;
    }
    const param = {
      'id': this.id
    };
    this.service.update(param, this.dataForm.value).subscribe((response) => {
      if (response['status']) {
        this.toastr.success('Data berhasil diubah', 'Success');
        this.route.navigateByUrl('/master/management-asisten-list');
        this.spinner.hide();
      } else {
        console.log(response['meta']);
        this.toastr.warning('Tidak ada perubahan', 'Warning');
        this.spinner.hide();
      }
    });
  }
  updatePassword() {
    this.spinner.show();
    this.service.update(this.id, this.dataPassword.value).subscribe((response) => {
      if (response['status']) {
        this.toastr.success('Password berhasil dirubah', 'Success');
        this.route.navigateByUrl('/master/management-asisten-list');
        this.spinner.hide();
      } else {
        console.log(response['meta']);
        this.toastr.warning('Password gagal dirubah', 'Warning');
        this.spinner.hide();
      }
    });
  }

  ngAfterViewInit(): void {
    this.focus.first.nativeElement.focus();
    this.shortcuts.push(
      {
        key: 'ctrl + s',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        command: e => this.update()
      },
      {
        key: 'enter',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        command: e => this.update()
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
  toggleCollapsePassword(): void {
    this.isCollapsedPassword = !this.isCollapsedPassword;
    this.iconCollapsePassword = this.isCollapsedPassword ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  change(event) {
    this.aktif = event;
  }


}
