import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Objeto Datos del Formulario
  public loginForm: FormGroup = this.fb.group({
    email: [ '',[Validators.required, Validators.email ]],
    password: [ '',[Validators.required] ]
  });

  //Mensaje para el usuario del por que no pudo conectarce
  public menssage:string = "";
  //mostrar Error
  public showText: boolean = false;
  //Spinner
  public spiner: boolean = false;// Loader

  constructor(private fb: FormBuilder, private authS: AuthService ,private router:Router) { }

  ngOnInit(): void {
  }

  async checkLogin(){
    //Si formulario es Invalido Marcar Errores y salir
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return
    }
    // Logear Con Firebase
    this.spiner = true;// Loader
    try{
      const {email, password} = this.loginForm.value;

      this.authS.login(email,password)
        .then( res => {
          localStorage.setItem("email",res.user.email);//Guardar Correo
          this.spiner = false;
          //this.router.navigate(['home/inicio']);
          window.location.reload();
          //this.router.navigate(['../../home'], { relativeTo: this.router });
        }, ( err => {
          console.info(err);
          this.menssage=err.message;
          this.spiner = false; // Loader
          this.showText = true; // Error
        }));
    }catch(er){
      this.spiner = false; // Loader
      this.showText = true; // Error
      this.menssage=er;
      console.log(er);
    }
  }

  public campoEsValido(campo:string){
      return this.loginForm.controls[campo].errors
              && this.loginForm.controls[campo].touched;
  }
}
