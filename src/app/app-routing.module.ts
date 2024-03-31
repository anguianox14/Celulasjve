import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//firebase
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path:'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [ AngularFireAuthGuard ], 
    data: { authGuardPipe: redirectLoggedInToItems }
  },
  {
    path: 'home',
    loadChildren: () => import('./principal/principal.module').then( m => m.PrincipalModule),
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {path: '', redirectTo: 'login', pathMatch: 'full',data: { authGuardPipe: redirectLoggedInToItems } },
  {path: '**', redirectTo: 'login',data: { authGuardPipe: redirectLoggedInToItems } },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
