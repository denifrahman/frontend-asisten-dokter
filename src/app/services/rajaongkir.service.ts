import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RajaongkirService {

  constructor(private http: HttpClient, private router: Router) { }

  getProvince() {
    return this.http.get(environment.API + '/rajaongkir/province/list');
  }

  getCity(param) {
    return this.http.get(environment.API + '/rajaongkir/kota/list', { params: param });
  }
  
  getSubdistrict(param) {
    return this.http.get(environment.API + '/rajaongkir/kecamatan/list', { params: param });
  }
  
  getSubdistrictById(param) {
    return this.http.get(environment.API + '/rajaongkir/kecamatanById/list', { params: param });
  }
}
