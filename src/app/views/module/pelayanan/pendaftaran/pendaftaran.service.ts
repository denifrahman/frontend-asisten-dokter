import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PendaftaranService {

  // public selectedPasien: any;
  selectedPasien: Observable<any>;
  _selectedPasien = new Subject<any>();

  constructor(private http: HttpClient) {
    this.selectedPasien = this._selectedPasien.asObservable();
  }

  setSelectedPasien(data) {
    this._selectedPasien.next(data);
    localStorage.setItem('pasienSelected', JSON.stringify(data));
  }

  getSelectedPasien = () =>
    this.selectedPasien;

  findAllPasienPerPage(param) {
    return this.http.get(environment.API + '/pasien/findAll', { params: param });
  }
  findPerPage(query) {
    return this.http.get(environment.API + '/lokasi-praktek/findAll', { params: query });
  }
  // tslint:disable-next-line: no-shadowed-variable
  findOneById(param) {
    return this.http.get(environment.API + '/pasien/findOne', { params: param });
  }
  onSave(body: any) {
    return this.http.post(environment.API + '/lokasipraktek/create', body);
  }
  // tslint:disable-next-line: no-shadowed-variable
  delete(param: string | number) {
    return this.http.delete(environment.API + '/lokasi-praktek/' + param);
  }
  // tslint:disable-next-line: no-shadowed-variable
  update(param: string, body: {}) {
    return this.http.post(environment.API + '/lokasipraktek/update/' + param, body);
  }
}
