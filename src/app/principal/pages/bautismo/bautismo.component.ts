import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../services/datos.service';
import { Router } from '@angular/router';
import { BautismoService } from '../../../services/bautismo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bautismo } from '../../interfaces/inferfaces';
import { ConexionService } from '../../../services/conexion.service';

@Component({
  selector: 'app-bautismo',
  templateUrl: './bautismo.component.html',
  styleUrls: ['./bautismo.component.css']
})
export class BautismoComponent implements OnInit {

  public load: boolean;
  public loadbtn: boolean;
  public mostrarEditB: boolean;
  private ciclo: string;
  private periodo: number;
  public bautismoSeleccionado: Bautismo;

  // Bautismo del Periodo
  get bautismosList(){
    this.load = false;
    return this.bautismosS.listbautismosP;
  }
  

  public formBautismo: FormGroup = this.fb.group({
    nombre: [ , Validators.required ],
    celula: [ , Validators.required ],
    fechaB: [],
    sexo: [],
    domicilio: [],
    codigoPostal: [],
    telefonoC: [],
    telefono: [], 
    correo: [],
    fechaNacimiento: [],
    profesion: [],
    padreEspiritual: [],
    telefonoPE: [],
  });

  constructor(  private fb: FormBuilder,
                private bautismosS: BautismoService,
                private datos: DatosService,
                private router: Router,
                private conexion: ConexionService
    ) { }

  ngOnInit(): void {
    this.permiso();
  }

  // Si Cuenta no tiene acceso Enviar a Home
  private permiso(){
    let cuenta = this.datos.getCuenta();
    let acceso = this.datos.getPermiso();
    if(cuenta !== "Admin" || acceso === "acceso denegado"){
      this.router.navigate(['home/inicio']); // Sin acceso enviar al Home
    }
  }

  public obtenerCiclo( ciclo:any ){
    this.load = true;
    this.ciclo = ciclo.ciclo;
    this.periodo = ciclo.periodo;
    // id
    const id: string = "B-" + ciclo.ciclo;
    this.bautismosS.bautismosPeriodo( id, this.periodo );
  }

  //**************************************************************************************************
  // NEW BAUTISMOS
  //**************************************************************************************************
  public campoValid(){
    return this.formBautismo.invalid && this.formBautismo.touched;
  }

  //********** Preparar el Edit  *************** */

  public mostrarAddModal(){
    this.mostrarEditB = false;
    this.formBautismo.reset();
  }

  //********** Preparar el Edit  *************** */

  public mostrarEditModal( b:Bautismo ){
    // Guardar el Bautismo Seleccionado
    this.bautismoSeleccionado = b;
    // True para mostrar Boton Edit 
    this.mostrarEditB = true;
    // Mostrar la Informacion del Bautismo seleccionado
    this.formBautismo.reset({
      nombre : b.nombre,
      celula : b.celula, 
      fechaB : b.fechaB, 
      sexo : b.sexo, 
      domicilio : b.domicilio, 
      codigoPostal : b.codigoPostal, 
      telefonoC : b.telefonoC, 
      telefono : b.telefono, 
      correo : b.correo, 
      fechaNacimiento : b.fechaNacimiento,
      profesion : b.profesion,
      padreEspiritual : b.padreEspiritual,
      telefonoPE : b.telefonoPE,
    });
  }
   //********* EDITAR O AGREGAR ************************************************************** */
  public submitBautismo(){
    // Formulario Invalido no Guardar
    if( this.formBautismo.invalid ){
      this.formBautismo.markAllAsTouched();
      return
    }
    // Loader
    this.loadbtn = true;
    // Datos del Formulario
    const { 
      nombre, 
      celula, 
      fechaB, 
      sexo, 
      domicilio, 
      codigoPostal, 
      telefonoC, 
      telefono, 
      correo, 
      fechaNacimiento,
      profesion,
      padreEspiritual,
      telefonoPE,
    } = this.formBautismo.value;
    // ID bautismos
    const id: string = "B-" + this.ciclo;
    // Guardar en BD
    if( this.mostrarEditB ){
      //Modificar Bautismo con la informacion Nueva
      this.bautismoSeleccionado.nombre = nombre,
      this.bautismoSeleccionado.celula = celula, 
      this.bautismoSeleccionado.fechaB = fechaB, 
      this.bautismoSeleccionado.sexo = sexo, 
      this.bautismoSeleccionado.domicilio = domicilio, 
      this.bautismoSeleccionado.codigoPostal = codigoPostal, 
      this.bautismoSeleccionado.telefonoC = telefonoC, 
      this.bautismoSeleccionado.telefono = telefono, 
      this.bautismoSeleccionado.correo = correo, 
      this.bautismoSeleccionado.fechaNacimiento = fechaNacimiento,
      this.bautismoSeleccionado.profesion = profesion,
      this.bautismoSeleccionado.padreEspiritual = padreEspiritual,
      this.bautismoSeleccionado.telefonoPE = telefonoPE,
      // Modificar en BD
      this.conexion.editarBautismo( this.bautismoSeleccionado, id ).then( ()=>{
        this.loadbtn = false;
        this.datos.openSnackBar( "Bautismo" , "Editado Correctamente");
        this.formBautismo.reset({
          fechaB : fechaB,
        });
      }).catch( er =>{
        console.log(er);
      });
    }else{
      // Objeto Bautismo con la informacion del Formulario
      const newBautismo: Bautismo = {
        periodo: this.periodo,
        nombre : nombre,
        celula : celula, 
        fechaB : fechaB, 
        sexo : sexo, 
        domicilio : domicilio, 
        codigoPostal : codigoPostal, 
        telefonoC : telefonoC, 
        telefono : telefono, 
        correo : correo, 
        fechaNacimiento : fechaNacimiento,
        profesion : profesion,
        padreEspiritual : padreEspiritual,
        telefonoPE : telefonoPE,
      }
      this.conexion.addBautismo( newBautismo, id ).then( ()=>{
        this.loadbtn = false;
        this.datos.openSnackBar( "Bautismo" , "Guardado Correctamente");
        this.formBautismo.reset({
          fechaB : fechaB,
        });
      }).catch( er =>{
        this.loadbtn = false;
        this.datos.openSnackBar( er , "ERROR");
        console.log(er);
      });
    }
  }
  
  //****************** Borrar BAUTISMO  */
  public borrarBautismo(){
    // ID bautismos
    const id: string = "B-" + this.ciclo;
    this.conexion.eliminarBautismo( this.bautismoSeleccionado, id ).then( ()=>{
      this.datos.openSnackBar( "BORRADO" , "Exitoso");
    }).catch( er =>{
      console.log(er);
      this.datos.openSnackBar( er , "ERROR");
    }); 
  }

  // Formato Numero de Coordinacion
  public redondearCelula(celula:number){
    const c = celula/100;
    return Math.floor(c);
  }

}
