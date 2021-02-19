import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  findAll() {
    this.http.get(environment.API + '/user/findAll');
  }
  findPerPage(query) {
    this.http.post(environment.API + '/user/findAll/', query);
  }
  findOneById(id) {
    this.http.get(environment.API + '/user/findOne/' + id);
  }
}
