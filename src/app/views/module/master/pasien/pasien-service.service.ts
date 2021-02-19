import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasienServiceService {

  constructor(private http: HttpClient) {
  }

  onSave(body: any) {
    return this.http.post(environment.API + '/pasien/create', body);
  }
  // tslint:disable-next-line: no-shadowed-variable
  delete(param: string | number) {
    return this.http.delete(environment.API + '/lokasi-praktek/' + param);
  }
  // tslint:disable-next-line: no-shadowed-variable
  update(param, body: {}) {
    return this.http.put(environment.API + '/pasien/update', body, { params: param });
  }

  findOneById(param) {
    return this.http.get(environment.API + '/pasien/findOne', { params: param });
  }
}
