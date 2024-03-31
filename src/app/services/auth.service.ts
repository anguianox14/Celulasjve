import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  // Logear Usuario
  async login(user:string,password:string) {
    return this.auth.signInWithEmailAndPassword(user,password);
  }
  // Crear Cuenta
  async createUser(user:string, password:string){
    return this.auth.createUserWithEmailAndPassword(user,password);
  }
  //Recuperar Contraseña
  async resetPassword(user: string){
    return this.auth.sendPasswordResetEmail(user);
  }
  // Deslogear
  logout(){
    return this.auth.signOut();
  }
  // quien esta Logeado Actualmente
  getCurrentUser(){
    return this.auth.authState.pipe(first()).toPromise();
  }
  //
  user(){
    return this.auth.user;
  }
}
