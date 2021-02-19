import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagementAsistenService {
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(environment.API + '/pegawai');
  }
  findPerPage(query: { limit: any; offset: any; q: string; }) {
    return this.http.get(environment.API + '/pegawai/findAll', { params: query });
  }
  // tslint:disable-next-line: no-shadowed-variable
  findOneById(param: { id: any; }) {
    return this.http.get(environment.API + '/pegawai/findOne', { params: param });
  }
  add(body: any) {
    return this.http.post(environment.API + '/pegawai/create', body);
  }
  // tslint:disable-next-line: no-shadowed-variable
  delete(param: string | number) {
    return this.http.delete(environment.API + '/pegawai/' + param);
  }
  // tslint:disable-next-line: no-shadowed-variable
  update(param, body: {}) {
    return this.http.put(environment.API + '/pegawai/update/', body, { params: param });
  }
}
