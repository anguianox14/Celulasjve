import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConexionService } from '../../../services/conexion.service';
import { Cuenta } from '../../interfaces/inferfaces';
import { DatosService } from '../../../services/datos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  // Vercion
  public vercion:string = "";
  public estaVercion:string = "1.0.7";
  // Loader principal
  public loader: boolean = false;
  // Permiso Stado
  public cuentas:Cuenta[];
  //
  public permiso: string = "Cargando...";
  public info: string = "";
  //
  public pedirPermiso: boolean = false;
  //Objeto Firebase del formulario
  public cuenta: Cuenta={
    createFecha: '',
    cuenta: '',
    numero: 0,
    nombre: '',
    telefono: '',
    email: '',
    permiso: '',
  }

  //Formulario
  public formPermiso: FormGroup = this.fb.group({
    cuenta:['Celula',  Validators.required],
    numero: [ , Validators.required ],
    nombre: [ , Validators.required ],
    telefono: [ '' ],
    email: [ , Validators.required ]
  });

  constructor(private fb: FormBuilder, private conexion: ConexionService, private datos:DatosService ) {

    this.loader = false;
    // Permiso Stado
    this.cuentas = [];
    //
    this.permiso = "Cargando...";
    this.info = "";
    //
    this.pedirPermiso = false;
  }

  ngOnInit(): void {
    // -- Permisos --
    this.obtenerDatos();
    this.conexion.getVercion().subscribe( ver =>{
      this.vercion = ver[0].name;
    });
  }
  //
  private obtenerDatos(){
    this.loader = true;
    try {
      this.permiso = this.datos.getPermiso();
      if(this.permiso === "Cargando..."){
        setTimeout( ()=>{
            this.obtenerDatos();
        } , 500 );
      }else {
        this.estadoDeCuenta();
        this.resetForm();
        return;
      }
    } catch (error) {
      console.log("Error");
      console.log(error);
    }
  }
  //
  public resetForm(){
    const email = localStorage.getItem("email");
    this.formPermiso.reset({
      cuenta:'Celula',
      numero: '',
      nombre: '',
      telefono: '',
      email: email
      });
  }
  //
  public estadoDeCuenta(){
    // Ver el formulario
    this.pedirPermiso = false;
    //Pendiente
    if(this.permiso==="pendiente"){
      this.info = "Por favor espere la revisión de la solicitud";
    //acceso permitido
    }else if(this.permiso==="acceso permitido"){
      this.info = "Habacuc 2:14. Porque la tierra será llena del conocimiento de la gloria del Señor, como las aguas cubren el mar.";
    //acceso denegado
    }else if(this.permiso==="acceso denegado"){
      this.info = "Póngase en contacto con su autoridad para tener acceso";
    }else if( this.permiso==="Sin permisos" ){
      this.info = "Por favor rellene y envie el formulario para tener acceso a la aplicacion";
      // Ver el formulario
      this.pedirPermiso = true;
    }
    this.loader = false;
  }
  //Mostrar errores
  public campoValido(campo: string){
    return this.formPermiso.controls[campo].errors
            && this.formPermiso.controls[campo].touched;
  }
  //Mostrar Mensaje Celula o coordinacion
  public tipoCuenta(){
    return this.formPermiso.controls.cuenta.value;
  }
  // Envio de formulario para permiso
  public formularioCuenta(){
    if(this.formPermiso.invalid){
      this.formPermiso.markAllAsTouched();
      return;
    }
    // Datos del Fermulario
    const { cuenta, numero, nombre, telefono, email } = this.formPermiso.value;
    //
    this.loader = true;
    // Agregar Datos a BD
    this.cuenta.createFecha = this.conexion.fechahoy();
    this.cuenta.cuenta = cuenta;
    this.cuenta.numero = numero;
    this.cuenta.nombre = nombre;
    this.cuenta.telefono = telefono;
    this.cuenta.email = email;
    this.cuenta.permiso = "pendiente";

    this.conexion.agregarCuenta(this.cuenta)
      .then( () =>{
        // Mensaje
        this.permiso = "pendiente";
        this.info = "Por favor espere la revisión de la solicitud";
        // Ver el formulario
        this.pedirPermiso = false;
        this.loader = false;
      }).catch( er =>{
        console.log(er);
        this.loader = false;
      });

  }
}
