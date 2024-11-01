import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { QcmComponent } from './page/qcm/qcm.component';
import { QcmPdfComponent } from './page/qcm-pdf/qcm-pdf.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'qcm', component: QcmComponent },
    { path: 'qcm-pdf', component: QcmPdfComponent },

];
