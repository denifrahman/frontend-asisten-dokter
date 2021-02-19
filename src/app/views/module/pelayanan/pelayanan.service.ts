import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PelayananService {
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(environment.API + '/organ');
  }
  findOrganById(query) {
    return this.http.get(environment.API + '/organ/getALlByParam', { params: query });
  }

  findPerPage(query: { limit: any; offset: any; search: string; }) {
    return this.http.get(environment.API + '/organ/findByPage', { params: query });
  }
  // tslint:disable-next-line: no-shadowed-variable
  findOneById(param: { id: any; }) {
    return this.http.get(environment.API + '/organ/findByPage', { params: param });
  }
  add(body: any) {
    return this.http.post(environment.API + '/organ/insert', body);
  }
  // tslint:disable-next-line: no-shadowed-variable
  delete(param: string | number) {
    return this.http.delete(environment.API + '/organ/' + param);
  }
  // tslint:disable-next-line: no-shadowed-variable
  update(param: string, body: {}) {
    return this.http.post(environment.API + '/organ/update/' + param, body);
  }
}
