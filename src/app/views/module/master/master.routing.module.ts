import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../services/auth.guard';
import { LokasiPraktekListComponent } from './lokasi-praktek/lokasi-praktek-list/lokasi-praktek-list.component';
import { LokasiPraktekEditComponent } from './lokasi-praktek/lokasi-praktek-edit/lokasi-praktek-edit.component';
import { LokasiPraktekAddComponent } from './lokasi-praktek/lokasi-praktek-add/lokasi-praktek-add.component';
import { ManagementAsistenListComponent } from './management-asisten/management-asisten-list/management-asisten-list.component';
import { ManagementAsistenEditComponent } from './management-asisten/management-asisten-edit/management-asisten-edit.component';
import { ManagementAsistenAddComponent } from './management-asisten/management-asisten-add/management-asisten-add.component';
import { PasienAddComponent } from './pasien/pasien-add/pasien-add.component';
import { PasienEditComponent } from './pasien/pasien-edit/pasien-edit.component';
import { PasienListComponent } from './pasien/pasien-list/pasien-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        data: {
            title: 'Master',
            children: [
                {
                    role: 'dokter'
                }
            ]
        },
        children: [
            {
                path: 'lokasi-praktek-list',
                component: LokasiPraktekListComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'List Lokasi Praktek',
                    children: [
                        {
                            role: 'admin'
                        }
                    ]
                }
            },
            {
                path: 'lokasi-praktek-edit',
                component: LokasiPraktekEditComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Edit Lokasi Praktek',
                    children: [
                        {
                            role: 'admin'
                        }
                    ]
                }
            },
            {
                path: 'lokasi-praktek-add',
                component: LokasiPraktekAddComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Add Lokasi Praktek',
                    children: [
                        {
                            role: 'admin'
                        }
                    ]
                }
            },
            {
                path: 'management-asisten-list',
                component: ManagementAsistenListComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'List Asisten',
                    children: [
                        {
                            role: 'admin'
                        }
                    ]
                }
            },
            {
                path: 'management-asisten-edit',
                component: ManagementAsistenEditComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Edit Asisten',
                    children: [
                        {
                            role: 'admin'
                        }
                    ]
                }
            },
            {
                path: 'management-asisten-add',
                component: ManagementAsistenAddComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Add Asisten',
                    children: [
                        {
                            role: 'admin'
                        }
                    ]
                }
            },
            {
                path: 'pasien-add',
                component: PasienAddComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Add Pasien',
                    children: [
                        {
                            role: 'admin'
                        }
                    ]
                }
            },
            {
                path: 'pasien-edit',
                component: PasienEditComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Edit Pasien',
                    children: [
                        {
                            role: 'admin'
                        }
                    ]
                }
            },
            {
                path: 'pasien-list',
                component: PasienListComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'List Pasien',
                    children: [
                        {
                            role: 'admin'
                        }
                    ]
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule { }
