import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendaftaranComponent } from './pendaftaran/pendaftaran.component';
import { RekamMedisAddComponent } from './rekam-medis-add/rekam-medis-add.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Pelayanan'
        },
        children: [
            {
                path: 'pendaftaran',
                component: PendaftaranComponent,
                data: {
                    title: 'Pendaftaran'
                }
            },
            {
                path: 'rekam-medis-add',
                component: RekamMedisAddComponent,
                data: {
                    title: 'Add Rekam Medis'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PelayananRoutingModule { }
