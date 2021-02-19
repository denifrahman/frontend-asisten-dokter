import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../../services/auth.service';
import { PendaftaranService } from '../../pendaftaran.service';

@Component({
  selector: 'app-popup-table-pasien',
  templateUrl: './popup-table-pasien.component.html',
  styleUrls: ['./popup-table-pasien.component.css']
})
export class PopupTablePasienComponent implements OnInit {
  @ViewChild('myTable') table: any;
  // @ViewChild('popOver') public popover: NgbPopover;

  loading = true;
  rows = [];
  selected = {
    id: '',
    no_rekamedis: '-',
    nama: '-',
    jenis_kelamin: '-',
    tanggal_lahir: '-',
    usia: '-',
    golongan_darah: '-'
  };
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
    q: ''
  };
  count = 0;
  isOpen = false;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  constructor(
    public datepipe: DatePipe,
    private service: PendaftaranService,
    private authService: AuthService,
    private route: Router, 
    private toastr: ToastrService
  ) {
    this.getPasienSelected();
  }

  ngOnInit(): void {
    this.findAllPasienPerPage();
    // this.getPasienSelected();
  }

  findAllPasienPerPage() {
    this.service.findAllPasienPerPage(this.page).subscribe((response) => {
      if (response['status']) {
        this.count = response['countRow'];
        this.rows = response['data'];
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }

  pageChange(event) {

  }

  changeRowLimits(event) {
    this.page.limit = event.target.value;
    this.page.offset = 0;
    this.findAllPasienPerPage();
  }
  filter(event) {
    if (event.keyCode === 13 || event === 'find') {
      this.page.offset = 0;
      this.findAllPasienPerPage();
    }
  }

  tambah() {
    this.route.navigate(['master/pasien-add']);
  }

  onSelect(event) {

    let data = {
      id: event.selected[0].id,
      no_rekamedis: event.selected[0].no_rekamedis,
      nama: event.selected[0].nama,
      tanggal_lahir: this.datepipe.transform(new Date(event.selected[0].tanggal_lahir), 'dd-MMM-yyyy'),
      golongan_darah: event.selected[0].golongan_darah,
      usia: this.CalculateAge(event.selected[0].tanggal_lahir).toString(),
      jenis_kelamin: event.selected[0].jenis_kelamin
    }
    this.isOpen = !this.isOpen;
    if (event.selected[0].aktif == '1') {
      this.getPasienSelected();
      this.service.setSelectedPasien(data);
      this.toastr.success('Pasien terpilih');
    }else{
      this.toastr.error('Pasien tidak aktif');
    }
  }

  public CalculateAge(birthdate) {
    let date = new Date(birthdate);
    if (date) {
      var timeDiff = Math.abs(Date.now() - date.getTime());
      //Used Math.floor instead of Math.ceil
      //so 26 years and 140 days would be considered as 26, not 27.
      let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      return age;
    }
  }

  findOneById() {
    this.route.navigateByUrl('/master/pasien-edit?id=' + this.selected.id + '&origin=pelayanan/pendaftaran');
  }

  async getPasienSelected() {
    let pasienSelected = localStorage.getItem('pasienSelected');
    let response = JSON.parse(pasienSelected);
    if (pasienSelected != null) {
      this.selected.id = await response.id.toString();
      this.selected.no_rekamedis = await response.no_rekamedis;
      this.selected.nama = await response.nama;
      this.selected.tanggal_lahir = await response.tanggal_lahir;
      this.selected.golongan_darah = await response.golongan_darah;
      this.selected.usia = await this.CalculateAge(response.tanggal_lahir).toString();
      this.selected.jenis_kelamin = await response.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan';
    }
  }

  resetFormPasien() {
    localStorage.removeItem('pasienSelected');
    this.selected.id = '',
      this.selected.no_rekamedis = '-',
      this.selected.nama = '-',
      this.selected.jenis_kelamin = '-',
      this.selected.tanggal_lahir = '-',
      this.selected.usia = '-',
      this.selected.golongan_darah = '-'
  }
}
