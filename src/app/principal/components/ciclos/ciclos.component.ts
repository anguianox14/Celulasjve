import { Component, OnInit } from '@angular/core';
import { InfoJveService } from '../../../services/info-jve.service';
import { Periodo, Celula, Nombre } from '../../interfaces/inferfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConexionService } from '../../../services/conexion.service';
import { DatosService } from '../../../services/datos.service';

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.css']
})
export class CiclosComponent implements OnInit {

  public load: boolean;
  public loadCopyStruc: boolean = false;
  public cicloSeleccionado: Periodo;
  //Porcentajer para copiar
  public numeroCelulasCopiadas: number;
  public numeroNombresCopiados: number;
  // text
  public mensaje: string = "";
  public mostrarCarga:boolean=false;
  // ejecutar solo 1 vez
  public copiaRealizadaCelulas: boolean = false;
  public copiaRealizadaNombres: boolean = false;

  get listCiclos(){
    this.load = false;
    return this.jve.ciclos;
  }

  public formCopyStruc: FormGroup = this.fb.group({
    ciclo: [ , Validators.required ]
  });

  public formCiclo:FormGroup = this.fb.group({
    fechaI : [ , Validators.required ],
    semana : [ , Validators.required ],
    fechaF : [ , Validators.required ],
  });

  constructor( private fb: FormBuilder,
              private jve: InfoJveService,
              private conexion: ConexionService,
              private datos: DatosService,
  ) { }

  ngOnInit(): void {

  }

  public iniciarForm(){
    const f:string = this.jve.fechahoy();
    this.formCiclo.reset({
      fechaI: f,
      semana: 52,
    });
    this.cacularSemanaFinal();
  }

  public mostrarFormulario( ciclo:Periodo ){
    this.cicloSeleccionado = ciclo;
  }

  public cacularSemanaFinal(){
    const { fechaI, semana } = this.formCiclo.value;

    let semanaF = new Date(fechaI);
    // Calcular Fecha
    for( let i=0; i<semana; i++ ){
      semanaF.setDate(semanaF.getDate() + 7 );
    }
    // FORMATO
    let m:string=""+(semanaF.getMonth() +1);
    let d:string=""+semanaF.getDate();
    if(semanaF.getMonth() +1< 10){
      m = "0"+m;
    }
    if(semanaF.getDate()<10){
      d = "0"+d;
    }
    const diaF = (semanaF.getFullYear() + "-" + m + "-" + d);
    // AGREGAR al Formulario
    console.log( diaF )
    this.formCiclo.controls.fechaF.setValue(diaF);
  }

  public calcularSemana(){
    const { fechaI, fechaF } = this.formCiclo.value;
    let f = new Date( fechaI );
    let fechaFinal = new Date( fechaF );
    //**Calcular Semana ************************************************************ */
    let semana = 0;
    while( f < fechaFinal ){
      semana++;
      f.setDate(f.getDate() + 7 );
      console.log( semana );
    }
    this.formCiclo.controls.semana.setValue(semana);
  }

  public addCiclo(){

    if( this.formCiclo.invalid ){
      this.datos.openSnackBar( "Datos Faltantes ", "Error" );
    }

    const { fechaI, fechaF, semana } = this.formCiclo.value;

    const newCiclo: Periodo = {
      fechaInicial: fechaI,
      fechaFinal: fechaF,
      nombre: fechaI+" : "+fechaF,
      nSemanas: semana,
    }

    this.conexion.addCiclo( newCiclo ).then( ()=>{
      this.datos.openSnackBar( " Ciclo Agregado ", "Exitosamente" );
    }).catch( er => {
      console.log( er );
      this.datos.openSnackBar( er, "Error" );
    })

  }

  public deleteCiclo(){

    this.conexion.eliminarPeriodo(this.cicloSeleccionado).then( ()=>{
      this.datos.openSnackBar( " Ciclo Borrado ", "Exitosamente" );
    }).catch( er => {
      console.log( er );
      this.datos.openSnackBar( er, "Error" );
    })
  }

  public copyStruc(){
    console.log("entro: "+"N-"+this.cicloSeleccionado.nombre);
    if( this.formCopyStruc.invalid ){
      this.mostrarCarga = true;
      this.mensaje = "Seleccione un Ciclo";
      return
    }
    this.mostrarCarga = true;
    this.loadCopyStruc = true; // mostrar Loader
    // Ciclo Seleccionado
    const { ciclo } = this.formCopyStruc.value;
    //Construir ID de Celulas
    const idC = "C-"+ciclo;
    //Construir ID de Nombres
    const idN = "N-"+ciclo;
    // Buscar Todas las Celulas del Ciclo
    this.conexion.leerCelulas(idC).subscribe( (c:Celula[]) => {
      if(!this.copiaRealizadaCelulas){
        this.copiaRealizadaCelulas = true;
        this.copiarCelulas(c);
      }
    })
    // Buscar los Nombres del Ciclo
    this.conexion.leerNombres(idN).subscribe( (n:Nombre[]) => {
      if(!this.copiaRealizadaNombres){
        this.copiaRealizadaNombres = true;
        this.copiarNonbres(n);
      } 
      
    });
  }
  // Agregar Celulas Al Ciclo seleccionado
  private copiarCelulas( c:Celula[] ){
    const idC = "C-"+this.cicloSeleccionado.nombre;
    this.numeroCelulasCopiadas = 0;
    this.mensaje = "";
    c.forEach( celula =>{
      delete celula.id; // Borrar el ID
      this.conexion.addCelula( celula, idC).then( ()=>{
        this.numeroCelulasCopiadas++;
        if( this.numeroCelulasCopiadas == c.length ){
          this.mensaje += " Celulas 100%. ";
          this.loadCopyStruc = false;
        }
      }).catch( er => {
        this.mensaje += er;
        console.log(er);
      })
    })
  }
  // Agregar Nombres a Ciclo seleccionado
  private copiarNonbres( n:Nombre[] ){
    const idC = "N-"+this.cicloSeleccionado.nombre;
    this.numeroNombresCopiados = 0;
    this.mensaje = "";
    n.forEach( nombre =>{
      delete nombre.id; // Borrar el ID
      this.conexion.addNombre( nombre, idC ).then( ()=>{
        this.numeroNombresCopiados++;
        if( this.numeroNombresCopiados == n.length ){
          this.mensaje += " Nombres 100%. ";
          this.loadCopyStruc = false;
        }
      }).catch( er =>{
        this.mensaje += er;
        console.log(er);
      });
    })
  }

}
