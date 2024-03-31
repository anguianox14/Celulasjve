import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  // Campos Formulario
  public resetForm: FormGroup = this.fb.group({
    email:[ '', [Validators.email, Validators.required] ]
  });
  //Spinner
  public spiner: boolean = false;
  //Mensaje
  public showText: boolean = false;
  public menssage:string;
  //Mensaje
  public showTextSend: boolean = false;

  constructor(private fb: FormBuilder, private authS: AuthService) { }

  ngOnInit(): void {
  }

  async resetPassword(){
    //Si formulario es Invalido Marcar Errores y salir
    if(this.resetForm.invalid){
      this.resetForm.markAllAsTouched();
      return
    }
    // Logear Con Firebase
    this.spiner = true;// Loader
    try{
      const {email} = this.resetForm.value;

      this.authS.resetPassword(email)
        .then( res => {
          console.log(res);
          this.resetForm.reset();
          this.showTextSend = true; // mensaje
          this.menssage = "Email Enviado correctamente. por favor revisa tu bandeja de correo";
          this.spiner = false;
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

  public campoEsValido(campo: string){
    return this.resetForm.controls[campo].errors
          && this.resetForm.controls[campo].touched;
  }

}
