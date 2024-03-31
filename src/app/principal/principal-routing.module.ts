import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SobresComponent } from './pages/sobres/sobres.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { SobresAdminComponent } from './pages/sobres-admin/sobres-admin.component';
import { ToolsComponent } from './pages/tools/tools.component';
import { EstructuraComponent } from './pages/estructura/estructura.component';
import { BautismoComponent } from './pages/bautismo/bautismo.component';
import { DebeSobresComponent } from './pages/debe-sobres/debe-sobres.component';
import { ReporteBautismoComponent } from './pages/reporte-bautismo/reporte-bautismo.component';
import { ReporteOfrendaComponent } from './pages/reporte-ofrenda/reporte-ofrenda.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'inicio',component: HomeComponent },
      {path: 'sobres',component: SobresComponent},
      {path: 'permisos',component: PermisosComponent},
      {path: 'datos-sobres',component: ReportesComponent},
      {path: 'debe-sobres',component: DebeSobresComponent},
      {path: 'reporte-bautismo',component: ReporteBautismoComponent},
      {path: 'reporte-ofrenda',component: ReporteOfrendaComponent},
      {path: 'sobres-ofrenda', component: SobresAdminComponent },
      {path: 'tools', component: ToolsComponent},
      {path: 'bautismos', component: BautismoComponent},
      {path: 'estructura', component: EstructuraComponent},
      //{path: 'upload', component: UploadComponent},
      {path: '**', redirectTo: 'inicio'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PrincipalRoutingModule { }
