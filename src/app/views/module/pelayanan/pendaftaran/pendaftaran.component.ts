import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth.service';
import { PendaftaranService } from './pendaftaran.service';

@Component({
  selector: 'app-pendaftaran',
  templateUrl: './pendaftaran.component.html',
  styleUrls: ['./pendaftaran.component.css']
})
export class PendaftaranComponent implements OnInit {
  @ViewChild('myTable') table: any;
  // @ViewChild('popOver') public popover: NgbPopover;


  loading = true;
  pasienSelected: any;

  constructor(
    public datepipe: DatePipe,
    private service: PendaftaranService,
    private authService: AuthService,
    private router: Router, private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPasienSelected();
  }

  getPasienSelected() {
    this.service.selectedPasien.subscribe((data) => {
      this.pasienSelected = data;
    });
  }
}