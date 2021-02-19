import { Component, ErrorHandler, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { AuthService } from './services/auth.service';
import { slideInAnimation } from './route-animation';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private config: NgSelectConfig,
    private auth: AuthService,
    private toastr: ToastrService,
    private errorHandlerService: ErrorHandler
  ) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }
  private ngUnsubscribe = new Subject();

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  // Your component
  
}
