import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarComponent } from './recuperar/recuperar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'sign-in',component: LoginComponent },
      {path: 'registro', component: RegistroComponent},
      {path: 'recuperar',component: RecuperarComponent},
      {path: '**', redirectTo: 'sign-in'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
