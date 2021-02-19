import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShortcutInput, AllowIn } from 'ng-keyboard-shortcuts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../services/auth.service';
import { RajaongkirService } from '../../../../../services/rajaongkir.service';
import { PasienServiceService } from '../pasien-service.service';

@Component({
  selector: 'app-pasien-add',
  templateUrl: './pasien-add.component.html',
  styleUrls: ['./pasien-add.component.css']
})
export class PasienAddComponent implements OnInit {

  dataProvinsi = [];
  dataKota = [];
  dataKecamatan = [];

  dataForm: any;

  @ViewChildren('nama') focus;
  @ViewChild('kota') kota;
  @ViewChild('kecamatan') kecamatan;
  shortcuts: ShortcutInput[] = [];

  constructor(
    private route: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private authService: AuthService,
    private rajaOngkir: RajaongkirService,
    private formBuilder: FormBuilder,
    private service: PasienServiceService
  ) {
    this.dataForm = this.formBuilder.group({
      nama: ['', Validators.required],
      jenis_kelamin: ['L'],
      tempat_lahir: ['', Validators.required],
      tanggal_lahir: ['', Validators.required],
      aktif: [false],
      jenis_identitas: ['', Validators.required],
      no_identitas: ['', Validators.required],
      pekerjaan: ['', Validators.required],
      no_telpon: ['', Validators.required],
      alamat: ['', Validators.required],
      golongan_darah: [Validators.required],
      create_by: [this.authService.getSession().nama, Validators.required],
      id_provinsi: [Validators.required],
      id_kota: [Validators.required],
      id_kecamatan: [Validators.required],
      id_parent_user:[this.authService.getParentIdUser(), Validators.required]
    });
  }

  ngOnInit(): void {
    this.getProvince();
  }

  goBack() {
    this.route.navigate(['pelayanan/pendaftaran']);
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
        this.service.onSave(this.dataForm.value).subscribe((response) => {
          if (response['status']) {
            this.toastr.success('Data berhasil ditambahkan', 'Success');
            this.route.navigateByUrl('/master/lokasi-praktek-list');
            this.spinner.hide();
          } else {
            this.toastr.warning(response['message'], 'Warning');
            this.spinner.hide();
          }
        });
      }
    }
  }
  openModal() {
    // throw new Error('Method not implemented.');
  }

  change(event) {
    // this.dataForm.value.aktif = event;
  }

}
