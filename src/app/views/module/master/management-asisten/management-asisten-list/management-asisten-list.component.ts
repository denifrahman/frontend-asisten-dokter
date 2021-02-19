import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AllowIn, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ManagementAsistenService } from '../management-asisten.service';
import { AuthService } from '../../../../../services/auth.service';


@Component({
  selector: 'app-management-asisten-list',
  templateUrl: './management-asisten-list.component.html',
  styleUrls: ['./management-asisten-list.component.css']
})
export class ManagementAsistenListComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private service: ManagementAsistenService, private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }
  shortcuts: ShortcutInput[] = [];
  @ViewChild('smModal') public smModal: ModalDirective;
  @ViewChild('modalBantuan') public modalBantuan: ModalDirective;
  rows = [];
  loading = true;
  selected = [];
  editing = {};
  LIMITS = [
    { key: '5', value: 5 },
    { key: '25', value: 25 },
    { key: '50', value: 50 },
    { key: '100', value: 100 }
  ];
  today = new Date();
  // limit: number = this.LIMITS[0].value;
  rowLimits: Array<any> = this.LIMITS;
  page = {
    limit: 5,
    offset: 0,
    id_role: 2,
    q: '',
    id_parent: this.authService.getParentIdUser()
  };
  count = 0;

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  agamaId: number;

  ngOnInit(): void {
    this.findAll(this.page);
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }
  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    const param = this.rows[rowIndex].id;
    const field = new Map();
    field.set(cell, this.rows[rowIndex][cell]);
    const body = {};
    field.forEach((value, key) => {
      body[key] = value;
    });
    console.log(body);

    this.service.update(param, body).subscribe((response) => {
      if (response['meta']['success']) {
        this.toastr.success('Data berhasil diperbarui', 'Success');
        this.findAll(this.page);
      }
    });
  }
  strMapToObj(map) {
    JSON.stringify([...map]);
  }

  findAll(param) {
    this.loading = true;
    this.service.findPerPage(param).subscribe(response => {
      if (response['status']) {
        this.count = response['countRow'];
        this.rows = response['data'];
        this.loading = false;
      } else {
        this.toastr.error('Terjadi kesalahan yang tak terduga', 'Kesalahan');
        this.loading = false;
      }
    });
  }

  findPerPage(pageInfo) {
    this.loading = true;
    this.rows = [];
    const param = {
      limit: pageInfo.limit,
      offset: pageInfo.offset,
      q: ''
    };
    this.page.offset = pageInfo.offset;
    this.service.findPerPage(param).subscribe(response => {
      if (response['status']) {
        this.count = response['countRow'];
        this.rows = response['data'];
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }

  filter(event) {
    if (event.keyCode === 13 || event === 'find') {
      this.page.offset = 0;
      this.findAll(this.page);
    }
  }


  tambah() {
    this.router.navigateByUrl('master/management-asisten-add');
  }
  changeRowLimits(event) {
    this.page.limit = event.target.value;
    this.page.offset = 0;
    this.findAll(this.page);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    // this.focus.first.nativeElement.focus();
    this.shortcuts.push(
      {
        key: 'ctrl + n',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        label: 'Tambah',
        description: 'Tambah',
        command: (e: ShortcutEventOutput) => this.tambah()
      },
      {
        key: 'ctrl + d',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        label: 'Hapus',
        description: 'Hapus',
        command: (e: ShortcutEventOutput) => this.multiDelete(this.selected)
      },
      {
        key: 'ctrl + e',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        label: 'Edit',
        description: 'Edit',
        command: (e: ShortcutEventOutput) => this.updateByPage(this.selected[0].id)
      },
    );
  }
  multiDelete(param) {
    if (this.selected.length === 0) {
      alert('Silahkan Pilih Data!!!');
    } else {
      for (let i = 0; i < param.length; i++) {
        const element = param[i];
        this.service.delete(element['id']).subscribe((response) => {
          if (response['meta']['success']) {
            this.findAll(this.page);
          }
        });
      }

    }
  }
  modalDelete(param) {
    this.smModal.show();
    this.agamaId = param;
  }

  bantuan() {
    this.modalBantuan.show();
  }

  delete() {
    this.service.delete(this.agamaId).subscribe((response) => {
      if (response['meta']['success']) {
        this.findAll(this.page);
        this.smModal.hide();
      }
    });
  }

  updateByPage(id) {
    this.router.navigateByUrl('master/management-asisten-edit?id=' + id);
  }

}

