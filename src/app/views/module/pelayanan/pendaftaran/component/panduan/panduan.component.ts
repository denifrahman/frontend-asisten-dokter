import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panduan',
  templateUrl: './panduan.component.html',
  styleUrls: ['./panduan.component.css']
})
export class PanduanComponent implements OnInit {
  isCollapsed: boolean = true;
  iconCollapse: string = 'icon-arrow-down';
  constructor() { }

  ngOnInit(): void {
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }
}
