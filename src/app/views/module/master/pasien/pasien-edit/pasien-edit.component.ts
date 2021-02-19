import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../services/auth.service';
import { RajaongkirService } from '../../../../../services/rajaongkir.service';
import { PendaftaranService } from '../../../pelayanan/pendaftaran/pendaftaran.service';
import { PasienServiceService } from '../pasien-service.service';

@Component({
  selector: 'app-pasien-edit',
  templateUrl: './pasien-edit.component.html',
  styleUrls: ['./pasien-edit.component.css']
})
export class PasienEditComponent implements OnInit {

  //parameter string query
  id;
  origin;
  // end

  dataProvinsi = [];
  dataKota = [];
  dataKecamatan = [];
  public aktif = false;
  @ViewChild('kota') kota;
  @ViewChild('kecamatan') kecamatan;
  shortcuts: ShortcutInput[] = [];

  dataForm: any;
  constructor(
    public datepipe: DatePipe,
    private service: PasienServiceService,
    private servicePendaftaran: PendaftaranService,
    private paramRoute: ActivatedRoute,
    private route: Router,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private rajaOngkir: RajaongkirService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    this.dataForm = this.formBuilder.group({
      nama: ['', Validators.required],
      jenis_kelamin: ['L', Validators.required],
      tempat_lahir: ['', Validators.required],
      tanggal_lahir: ['', Validators.required],
      aktif: [false],
      jenis_identitas: ['', Validators.required],
      no_identitas: ['', Validators.required],
      pekerjaan: ['', Validators.required],
      no_telpon: ['', Validators.required],
      alamat: ['', Validators.required],
      golongan_darah: [Validators.required],
      update_by: ['', Validators.required],
      id_provinsi: [Validators.required],
      id_kota: [Validators.required],
      id_kecamatan: [Validators.required],
      id_parent_user: ['', Validators.required],
      no_rekamedis: ['', Validators.required]
    });
    this.paramRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.origin = params['origin'];
    });
  }

  ngOnInit(): void {
    this.findOneById();
  }
  findOneById() {
    this.spinner.show();
    let param = {
      id: this.id
    };
    this.service.findOneById(param).subscribe((response) => {
      const result = response['data'];
      this.dataForm.setValue({
        nama: result.nama,
        jenis_kelamin: result.jenis_kelamin === null ? '' : result.jenis_kelamin,
        tempat_lahir: result.tempat_lahir === null ? '' : result.tempat_lahir,
        tanggal_lahir: result.tanggal_lahir === null ? '' : this.datepipe.transform(new Date(result.tanggal_lahir), 'yyyy-MM-dd'),
        jenis_identitas: result.jenis_identitas === null ? '' : result.jenis_identitas,
        no_identitas: result.no_identitas === null ? '' : result.no_identitas,
        pekerjaan: result.pekerjaan === null ? '' : result.pekerjaan,
        no_telpon: result.no_telpon === null ? '' : result.no_telpon,
        alamat: result.alamat === null ? '' : result.alamat,
        golongan_darah: result.golongan_darah === null ? '' : result.golongan_darah,
        update_by: this.authService.getSession().nama,
        aktif: result.aktif === 1 ? true : false,
        id_provinsi: result.id_provinsi === null ? '' : result.id_provinsi.toString(),
        id_kota: result.id_kota === null ? '' : result.id_kota.toString(),
        id_kecamatan: result.id_kecamatan === null ? '' : result.id_kecamatan.toString(),
        id_parent_user: result.id_parent_user === null ? '' : result.id_parent_user,
        no_rekamedis: result.no_rekamedis === null ? '' : result.no_rekamedis
      });
      this.getProvince();
      this.getCity({ province_id: result.id_provinsi });
      this.getSubdistrict({ city_id: result.id_kota });
    });
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
  onUpdate() {
    console.log(this.dataForm.value);
    if (this.dataForm.valid && this.dataForm.dirty) {
      this.spinner.show();
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
          this.goBack();
        }
      });
    } else {
      this.toastr.warning('Tidak ada perubahan data', 'Warning');
      this.spinner.hide();
    }
  }
  async goBack() {
    let selected = {
      id: this.id,
      no_rekamedis: this.dataForm.value.no_rekamedis,
      nama: this.dataForm.value.nama,
      jenis_kelamin: this.dataForm.value.jenis_kelamin,
      tanggal_lahir: this.dataForm.value.tanggal_lahir,
      golongan_darah: this.dataForm.value.golongan_darah
    };
    await this.servicePendaftaran.setSelectedPasien(selected);
    this.route.navigateByUrl(this.origin);
  }

}
