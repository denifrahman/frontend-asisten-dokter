import { Injectable } from '@angular/core';
import { of, empty, Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;
  private errors = false;
  roleAs: string;
  errorMessage: Observable<any>;
  _errorMessage = new Subject<any>();

  constructor(private http: HttpClient, private router: Router) {
    this.errorMessage = this._errorMessage.asObservable();
  }
  login(body: string) {
    let response = this.http.post(environment.API + '/auth/login', body)
    return response;
  }

  logout() {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    return of({ success: this.isLogin, role: '' });
  }

  addErrors(data) {
    this._errorMessage.next(data);
    console.log(data);
  }
  getErrors() {
    return this.errors;
  }

  isLoggedIn() {
    const loggedIn = JSON.parse(sessionStorage.getItem('session_auth'));
    if (loggedIn === 'undefine' || loggedIn === null) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
    return this.isLogin;
  }

  getSession() {
    const dataSession = JSON.parse(sessionStorage.getItem('session_auth'));
    return dataSession.data;
  }

  getParentIdUser() {
    const dataSession = JSON.parse(sessionStorage.getItem('session_auth'));
    return dataSession.data.id_parent;
  }

  getTokenAcces() {
    const token = sessionStorage.getItem('tokenAccess');
    return token;
  }

  chekEmail(param: { email: any }, callback) {
    return this.http.get(environment.API + '/user/getAllByParam', { params: param }).subscribe((response) => {
      const result = response['data'];
      if (result.length === 0) {
        // tslint:disable-next-line: no-unused-expression
        callback(false);
      } else {
        // tslint:disable-next-line: no-unused-expression
        callback(true);
      }
    });
  }

}
