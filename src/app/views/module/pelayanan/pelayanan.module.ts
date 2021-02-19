import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PelayananRoutingModule } from './pelayanan.routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { RekamMedisAddComponent } from './rekam-medis-add/rekam-medis-add.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PendaftaranComponent } from './pendaftaran/pendaftaran.component';
import { PopupTablePasienComponent } from './pendaftaran/component/popup-table-pasien/popup-table-pasien.component';
import { PanduanComponent } from './pendaftaran/component/panduan/panduan.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormRawatJalanComponent } from './pendaftaran/component/form-rawat-jalan/form-rawat-jalan.component';


@NgModule({
  declarations: [
    RekamMedisAddComponent,
    PendaftaranComponent,
    PopupTablePasienComponent,
    PanduanComponent,
    FormRawatJalanComponent
  ],
  imports: [
    CanvasWhiteboardModule,
    PopoverModule.forRoot(),
    AgGridModule,
    CommonModule,
    NgSelectModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    KeyboardShortcutsModule.forRoot(),
    PelayananRoutingModule,
    CollapseModule.forRoot(),
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
    TabsModule,
    NgxSpinnerModule
  ],
  providers: [DatePipe]
})
export class PelayananModule { }
