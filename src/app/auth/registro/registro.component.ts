import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public registerForm: FormGroup = this.fb.group({
    email: [ '',[Validators.required, Validators.email ]],
    password: [ '',[Validators.required, Validators.minLength(5)] ],
    password2: [ '',[Validators.required, Validators.minLength(5)] ],
  });
  //mensaje
  public menssage: string = "";
  public showText: boolean = false;
  //spinner
  public spiner: boolean = false;

  constructor(private fb: FormBuilder, private authS: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  public campoEsValido( campo:string){
    return this.registerForm.controls[campo].errors
            && this.registerForm.controls[campo].touched;
  }

  public campoConfirmacion(){
    return this.registerForm.controls['password2'].value != this.registerForm.controls['password'].value 
          && this.registerForm.controls['password2'].touched;
  }

  async registerNew(){
    //Si formulario es Invalido Marcar Errores y salir
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return
    }
    // Logear Con Firebase
    this.spiner = true;// Loader
    try{
      const {email, password} = this.registerForm.value;

      this.authS.createUser(email,password)
        .then( res => {
          this.spiner = false;
          window.location.reload();
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

}
