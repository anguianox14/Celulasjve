import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PrincipalRoutingModule } from './principal-routing.module';
//Material
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
//Icons
import {MatIconModule} from '@angular/material/icon';
//
import { PermisosComponent } from './pages/permisos/permisos.component';
import { HomeComponent } from './pages/home/home.component';
import { SobresComponent } from './pages/sobres/sobres.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { SobresAdminComponent } from './pages/sobres-admin/sobres-admin.component';
import { ToolsComponent } from './pages/tools/tools.component';
import { EstructuraComponent } from './pages/estructura/estructura.component';
import { SelectCiclosComponent } from './components/select-ciclos/select-ciclos.component';
import { BautismoComponent } from './pages/bautismo/bautismo.component';
import { DebeSobresComponent } from './pages/debe-sobres/debe-sobres.component';
import { ReporteBautismoComponent } from './pages/reporte-bautismo/reporte-bautismo.component';
import { ReporteOfrendaComponent } from './pages/reporte-ofrenda/reporte-ofrenda.component';
import { CiclosComponent } from './components/ciclos/ciclos.component';
import { UploadSobresComponent } from './components/upload-sobres/upload-sobres.component';
import { UploadBautisosComponent } from './components/upload-bautisos/upload-bautisos.component';
import { BtnExcelComponent } from './components/btn-excel/btn-excel.component';

@NgModule({
  declarations: [
    HomeComponent,
    SobresComponent,
    PermisosComponent,
    UploadComponent,
    ReportesComponent,
    SobresAdminComponent,
    ToolsComponent,
    EstructuraComponent,
    SelectCiclosComponent,
    BautismoComponent,
    DebeSobresComponent,
    ReporteBautismoComponent,
    ReporteOfrendaComponent,
    CiclosComponent,
    UploadSobresComponent,
    UploadBautisosComponent,
    BtnExcelComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ]
})
export class PrincipalModule { }
