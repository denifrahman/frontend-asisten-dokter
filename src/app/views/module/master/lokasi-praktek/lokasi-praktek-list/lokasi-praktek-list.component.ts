import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AllowIn, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { LokasiPraktekService } from '../lokasi-praktek.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-lokasi-praktek-list',
  templateUrl: './lokasi-praktek-list.component.html',
  styleUrls: ['./lokasi-praktek-list.component.css']
})
export class LokasiPraktekListComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line: max-line-length
  constructor(private service: LokasiPraktekService,  private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }
  shortcuts: ShortcutInput[] = [];
  @ViewChild('smModal') public smModal: ModalDirective;
  @ViewChild('modalBantuan') public modalBantuan: ModalDirective;
  @ViewChild('myTable') table: any;
  rows = [];
  loading = true;
  selected = [];
  editing = {};
  LIMITS = [
    { key: '10', value: 10 },
    { key: '25', value: 25 },
    { key: '50', value: 50 },
    { key: '100', value: 100 }
  ];
  today = new Date();
  // limit: number = this.LIMITS[0].value;
  rowLimits: Array<any> = this.LIMITS;
  page = {
    limit: 10,
    offset: 0,
    q: '',
    id_user: this.authService.getSession().id
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
      if (response['status']) {
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
        this.loading = false;
      }
    });
  }

  findPerPage(pageInfo) {
    this.loading = true;
    const param = {
      limit: pageInfo.limit,
      offset: pageInfo.offset,
      q: this.page.q
    };
    this.page.limit = pageInfo.limit;
    this.page.offset = pageInfo.offset;
    this.service.findPerPage(this.page).subscribe(response => {
      if (response['status']) {
        this.count = response['meta'].total;
        this.rows = response['data'];
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }

  tambah() {
    this.router.navigateByUrl('master/lokasi-praktek-add');
  }
  changeRowLimits(event) {
    this.page.limit = event.target.value;
    this.page.offset = 0;
    this.findAll(this.page);
  }

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
          if (response['status']) {
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
      if (response['status']) {
        this.findAll(this.page);
        this.smModal.hide();
      }
    });
  }

  updateByPage(id) {
    this.router.navigateByUrl('master/lokasi-praktek-edit?id=' + id);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  toggleExpandGroup(group) {
    console.log('Toggled Expand Group!', group);
    this.table.groupHeader.toggleExpandGroup(group);
  }
}
