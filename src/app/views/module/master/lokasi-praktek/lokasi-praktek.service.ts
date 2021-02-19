import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LokasiPraktekService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(environment.API + '/lokasi-praktek');
  }
  findPerPage(query) {
    return this.http.get(environment.API + '/lokasi-praktek/findAll', { params: query });
  }
  // tslint:disable-next-line: no-shadowed-variable
  findOneById(param: { id: any; }) {
    return this.http.get(environment.API + '/lokasi-praktek/findOne', { params: param });
  }
  onSave(body: any) {
    return this.http.post(environment.API + '/lokasi-praktek/create', body);
  }
  // tslint:disable-next-line: no-shadowed-variable
  delete(param: string | number) {
    return this.http.delete(environment.API + '/lokasi-praktek/' + param);
  }
  // tslint:disable-next-line: no-shadowed-variable
  update(param, body: {}) {
    return this.http.put(environment.API + '/lokasi-praktek/update/', body, { params: param });
  }
}
