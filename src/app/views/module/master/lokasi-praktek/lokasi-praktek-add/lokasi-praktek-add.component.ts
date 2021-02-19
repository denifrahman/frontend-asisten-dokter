import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit } from '@angular/core';
import { ShortcutInput, AllowIn } from 'ng-keyboard-shortcuts';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LokasiPraktekService } from '../lokasi-praktek.service';
import { ToastrService } from 'ngx-toastr';
import { RajaongkirService } from '../../../../../services/rajaongkir.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-lokasi-praktek-add',
  templateUrl: './lokasi-praktek-add.component.html',
  styleUrls: ['./lokasi-praktek-add.component.css']
})
export class LokasiPraktekAddComponent implements OnInit, AfterViewInit {
  dataProvinsi = [];
  dataKota = [];
  dataKecamatan = [];
  shortcuts: ShortcutInput[] = [];
  public aktif = false;
  today = new Date();
  dataForm: any;
  items: Array<any> = [];
  value: any = {};
  @ViewChildren('nama') focus;
  @ViewChild('kota') kota;
  @ViewChild('kecamatan') kecamatan;
  @ViewChild(ModalDirective) public lgModal: ModalDirective;
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authService: AuthService,
    private rajaOngkir: RajaongkirService,
    private route: Router,
    private formBuilder: FormBuilder,
    private service: LokasiPraktekService
  ) {
    this.dataForm = this.formBuilder.group({
      nama: ['', Validators.required],
      keterangan: [''],
      jam_buka: ['', Validators.required],
      jam_tutup: ['', Validators.required],
      aktif: [false],
      id_user: [this.authService.getParentIdUser(), Validators.required],
      id_provinsi: [Validators.required],
      id_kota: [Validators.required],
      id_kecamatan: [Validators.required]
    });

  }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  ngOnInit(): void {
    this.getProvince();
  }

  getProvince() {
    this.rajaOngkir.getProvince().subscribe((response) => {
      this.dataProvinsi = response['rajaongkir'].results;
    });
  }
  getCity(prop) {
    this.spinner.show();
    this.kota.clearModel();
    if (prop != null) {
      const param = {
        province: prop.province_id,
      };
      this.rajaOngkir.getCity(param).subscribe((response) => {
        this.dataKota = response['rajaongkir'].results;
        this.spinner.hide();
      });
    } else {
      // this.spinner.hide();
    }
  }
  getSubdistric(prop) {
    this.spinner.show();
    this.kecamatan.clearModel();
    if (prop != null) {
      const param = {
        city: prop.city_id,
      };
      this.rajaOngkir.getSubdistrict(param).subscribe((response) => {
        this.dataKecamatan = response['rajaongkir'].results;
        this.spinner.hide();
      });
    } else {
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
    }
  }
  collapsed(event: any): void {
    // console.log(event);
  }
  onSave() {
    if (this.dataForm.dirty && this.dataForm.valid) {
      this.spinner.show();
      if (this.dataForm.value.aktif === true) {
        this.dataForm.value.aktif = 1;
      } else {
        this.dataForm.value.aktif = 0;
      }
      if (this.dataForm.value.id_kota == null) {
        this.toastr.warning('Silahkan isi kota', 'Lengkapi data');
      } else if (this.dataForm.value.id_kecamatan == null) {
        this.toastr.warning('Silahkan isi kecamatan', 'Lengkapi data');
      } else {
        console.log(this.dataForm.value);
        this.service.onSave(this.dataForm.value).subscribe((response) => {
          if (response['meta']['success']) {
            this.toastr.success('Data berhasil ditambahkan', 'Success');
            this.route.navigateByUrl('/pelayanan/pendaftaran');
            this.spinner.hide();
          } else {
            this.toastr.warning(response['meta'].message, 'Warning');
            this.spinner.hide();
          }
        });
      }
    }
  }
  ngAfterViewInit(): void {
    this.focus.first.nativeElement.focus();
    this.shortcuts.push(
      {
        key: 'ctrl + s',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        command: e => this.onSave()
      },
      {
        key: 'enter',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input],
        command: e => this.onSave()
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
