import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterRoutingModule } from './master.routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ChartsModule } from 'ng2-charts';
import { LokasiPraktekListComponent } from './lokasi-praktek/lokasi-praktek-list/lokasi-praktek-list.component';
import { LokasiPraktekEditComponent } from './lokasi-praktek/lokasi-praktek-edit/lokasi-praktek-edit.component';
import { LokasiPraktekAddComponent } from './lokasi-praktek/lokasi-praktek-add/lokasi-praktek-add.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ToastrModule } from 'ngx-toastr';
import { ManagementAsistenAddComponent } from './management-asisten/management-asisten-add/management-asisten-add.component';
import { ManagementAsistenListComponent } from './management-asisten/management-asisten-list/management-asisten-list.component';
import { ManagementAsistenEditComponent } from './management-asisten/management-asisten-edit/management-asisten-edit.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PasienAddComponent } from './pasien/pasien-add/pasien-add.component';
import { PasienEditComponent } from './pasien/pasien-edit/pasien-edit.component';
import { PasienListComponent } from './pasien/pasien-list/pasien-list.component';
import { DatePipe } from '@angular/common';
import { UnitListComponent } from './unit/unit-list/unit-list.component';
import { UnitAddComponent } from './unit/unit-add/unit-add.component';
import { UnitEditComponent } from './unit/unit-edit/unit-edit.component';
import { DokterAddComponent } from './dokter/dokter-add/dokter-add.component';
import { DokterListComponent } from './dokter/dokter-list/dokter-list.component';
import { DokterEditComponent } from './dokter/dokter-edit/dokter-edit.component';

@NgModule({
  declarations: [
    UserEditComponent,
    UserListComponent,
    LokasiPraktekListComponent,
    LokasiPraktekEditComponent,
    LokasiPraktekAddComponent,
    ManagementAsistenAddComponent,
    ManagementAsistenListComponent,
    ManagementAsistenEditComponent,
    PasienListComponent,
    PasienAddComponent,
    PasienEditComponent,
    UnitListComponent,
    UnitAddComponent,
    UnitEditComponent,
    DokterAddComponent,
    DokterListComponent,
    DokterEditComponent
  ],
  imports: [
    CanvasWhiteboardModule,
    NgxSpinnerModule,
    NgSelectModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgxMaterialTimepickerModule.setLocale('en-US'),
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
    TabsModule,
    AgGridModule,
    ChartsModule,
    ModalModule.forRoot(),
    NgSelectModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    KeyboardShortcutsModule.forRoot(),
    MasterRoutingModule,
    CollapseModule.forRoot(),
  ],
  providers: [
    BsModalRef,
    DatePipe
  ]
})
export class MasterModule { }
