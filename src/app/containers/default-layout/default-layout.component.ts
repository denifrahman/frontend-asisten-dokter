import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import { navItems } from '../../_nav';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  constructor(private auth: AuthService, private http: HttpClient) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }
  public sidebarMinimized = false;
  public navItems;
  public session_auth: any;
  public now: Date = new Date();

  ngOnInit(): void {
    this.session_auth = JSON.parse(sessionStorage.getItem('session_auth'))['data'];
    this.findAllMenu();
  }

  findAllMenu() {
    const params = new HttpParams().set('id_role', this.auth.getSession().id_role);
    this.http.get(environment.API + '/menu/viewMenu', { params: params }).subscribe((response) => {
      console.log(response);
      this.navItems = response['data'];
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    window.location.href = '/#/login';
    localStorage.removeItem('session_auth');
    sessionStorage.removeItem('session_auth');
    sessionStorage.removeItem('tokenAccess');
    sessionStorage.removeItem('tokenRefresh');
  }
}
