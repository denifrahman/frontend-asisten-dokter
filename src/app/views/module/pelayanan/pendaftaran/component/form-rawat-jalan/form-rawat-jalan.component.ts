import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-rawat-jalan',
  templateUrl: './form-rawat-jalan.component.html',
  styleUrls: ['./form-rawat-jalan.component.css']
})
export class FormRawatJalanComponent implements OnInit {
  dataUnit: any;
  today = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm');
  constructor(
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

}
