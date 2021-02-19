import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { catchError, retry,tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class AppInterceptorsService implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.auth.getTokenAcces(),
      'Access-Control-Allow-Origin': '*'
    });
    // this.auth.addErrors('test');
    const clone = req.clone({
      headers: headers
    });
    // return next.handle(clone).pipe(
    //   catchError((this.handlerError)),
    //   retry(2)
    // );
    return next.handle(clone).pipe(
          tap(evt => {
            if (evt instanceof HttpResponse) {
              if (evt.body && evt.body.success)
                this.toast.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
            }
          }),
          catchError((error: any) => {
            // if (err instanceof HttpErrorResponse) {
            if (error.status === 400) {
              // window.location.href = '/#/login';
              // sessionStorage.removeItem('session_auth');
              // sessionStorage.removeItem('tokenAccess');
              // sessionStorage.removeItem('tokenRefresh');
              // localStorage.removeItem('pasienSelected');
              this.toast.error('Terjadi kesalahan tak terduga', error.statusText);
              this.spinner.hide();
            } else if (error.status === 401) {
              window.location.href = '/#/login';
              sessionStorage.removeItem('session_auth');
              sessionStorage.removeItem('tokenAccess');
              sessionStorage.removeItem('tokenRefresh');
              localStorage.removeItem('pasienSelected');
              this.toast.error(error.error.meta.messaage, error.statusText);
              this.spinner.hide();
            } else if (error.status === 402) {
              window.location.href = '/#/login';
              sessionStorage.removeItem('session_auth');
              sessionStorage.removeItem('tokenAccess');
              sessionStorage.removeItem('tokenRefresh');
              localStorage.removeItem('pasienSelected');
              this.toast.error(error.error.meta.messaage, error.statusText);
              this.spinner.hide();
            }
            return throwError(error);
          }), retry(2));
    
      // }
  }
}
// }
