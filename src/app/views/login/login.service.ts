import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  findAll() {
    return this.http.get(environment.API + '/agama');
  }
  findPerPage(query) {
    return this.http.post(environment.API + '/agama/findByPage/', query);
  }
  findOneById(id) {
    return this.http.get(environment.API + '/agama/findOneById/' + id);
  }
  add(body) {
    return this.http.post(environment.API + '/agama', body);
  }
  delete(param) {
    return this.http.delete(environment.API + '/agama/' + param);
  }
  update(param, body) {
    return this.http.put(environment.API + '/agama/' + param, body);
  }
}
