import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit } from '@angular/core';
import { ShortcutInput, AllowIn } from 'ng-keyboard-shortcuts';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LokasiPraktekService } from '../lokasi-praktek.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RajaongkirService } from '../../../../../services/rajaongkir.service';
import { AuthService } from '../../../../../services/auth.service';
@Component({
  selector: 'app-lokasi-praktek-edit',
  templateUrl: './lokasi-praktek-edit.component.html',
  styleUrls: ['./lokasi-praktek-edit.component.css']
})
export class LokasiPraktekEditComponent implements OnInit, AfterViewInit {
  dataProvinsi = [];
  dataKota = [];
  dataKecamatan = [];
  public aktif = false;
  shortcuts: ShortcutInput[] = [];
  today = new Date();
  dataForm: any;
  id;
  nama: String;
  items: Array<any> = [];
  value: any = {};
  @ViewChildren('nama') focus;
  @ViewChild('kota') kota;
  @ViewChild('kecamatan') kecamatan;
  @ViewChild(ModalDirective) public lgModal: ModalDirective;
  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private rajaOngkir: RajaongkirService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private route: Router,
    private paramRoute: ActivatedRoute,
    private service: LokasiPraktekService
  ) {
    this.dataForm = this.formBuilder.group({
      nama: ['', Validators.required],
      keterangan: [''],
      jam_buka: ['', Validators.required],
      jam_tutup: ['', Validators.required],
      aktif: [false],
      id_user: ['', Validators.required],
      id_provinsi: [Validators.required],
      id_kota: [Validators.required],
      id_kecamatan: [Validators.required]
    });
    this.paramRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  ngOnInit(): void {
    this.findOneById();
  }
  findOneById() {
    this.spinner.show();
    const param = {
      'id': this.id
    }
    this.service.findOneById(param).subscribe(response => {
      const result = response['data'];
      console.log(result);
      this.dataForm.setValue({
        nama: result.nama,
        keterangan: result.keterangan,
        jam_buka: result.jam_buka === null ? '' : result.jam_buka,
        jam_tutup: result.jam_tutup === null ? '' : result.jam_tutup,
        aktif: result.aktif === 1 ? true : false,
        id_provinsi: result.id_provinsi === null ? '' : result.id_provinsi.toString(),
        id_kota: result.id_kota === null ? '' : result.id_kota.toString(),
        id_kecamatan: result.id_kecamatan === null ? '' : result.id_kecamatan.toString(),
        id_user: this.authService.getParentIdUser()
      });
      console.log(result.id_provinsi);

      this.getProvince();
      this.getCity({ province_id: result.id_provinsi });
      this.getSubdistrict({ city_id: result.id_kota });
      // this.spinner.hide();
    });
  }
  collapsed(event: any): void {
    // console.log(event);
  }
  getProvince() {
    this.rajaOngkir.getProvince().subscribe((response) => {
      this.dataProvinsi = response['rajaongkir'].results;
    });
  }
  getCity(prop) {
    this.spinner.show();
    if (prop != null) {
      const param = {
        province: prop.province_id,
      };
      this.rajaOngkir.getCity(param).subscribe((response) => {
        this.dataKota = response['rajaongkir'].results;
        this.spinner.hide();
      });
    }
  }

  onchageCity(event) {
    this.kecamatan.clearModel();
    this.getSubdistrict(event);
  }

  onchageProvince(event) {
    console.log(event);

    this.kota.clearModel();
    this.kecamatan.clearModel();
    this.getCity(event);
  }

  getSubdistrict(prop) {
    this.spinner.show();
    if (prop != null) {
      const param = {
        city: prop.city_id
      };
      this.rajaOngkir.getSubdistrict(param).subscribe((response) => {
        this.dataKecamatan = response['rajaongkir'].results;
        this.spinner.hide();
      });
    } else {
      setTimeout(() => {
        this.spinner.hide();
      }, 1000);
    }
  }
  update() {
    this.spinner.show();
    if (this.dataForm.dirty && this.dataForm.valid) {
      if (this.dataForm.value.aktif === true) {
        this.dataForm.value.aktif = 1;
      } else {
        this.dataForm.value.aktif = 0;
      }
      const param = {
        'id': this.id
      }
      this.service.update(param, this.dataForm.value).subscribe((response) => {
        if (response['status']) {
          this.spinner.hide();
          this.toastr.success('Data berhasil diperbarui', 'Success');
          this.route.navigateByUrl('/master/lokasi-praktek-list');
        }
      });
    } else {
      this.toastr.warning('Tidak ada perubahan data', 'Warning');
      this.spinner.hide();
    }
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
    this.dataForm.value.agama_aktif = true;
  }
  openModal() {
    this.lgModal.show();
  }
  expanded(event: any): void {
    // console.log(event);
  }
  goBack() {
    this.route.navigateByUrl('master/lokasi-praktek-list');
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
  change(event) {
    this.aktif = event;
  }

}

