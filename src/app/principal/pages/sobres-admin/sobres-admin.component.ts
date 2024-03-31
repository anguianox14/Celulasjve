import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatosService } from '../../../services/datos.service';
import { Router } from '@angular/router';
import { ConexionService } from '../../../services/conexion.service';
import { Periodo, Sobre, Celula } from '../../interfaces/inferfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sobres-admin',
  templateUrl: './sobres-admin.component.html',
  styleUrls: ['./sobres-admin.component.css']
})
export class SobresAdminComponent implements OnInit {

  // Focus
  @ViewChild('celulaInput') celulaInputElement: ElementRef;

  public loaderCelulas:boolean = true;
  public loader:boolean;
  //periodo
  public listPeriodos: Periodo[];
  public periodoNom: string;
  public periodoActual: Periodo;
  
  //Sobres
  public sobres: Sobre[];
  public sobreVerificar: Sobre;
  public sobreRepetido:boolean = false;
  // Celulas
  public allCelulas: Celula[];
  // fecha
  public fechaHoy: string;
  
  //semana
  public semana: number;

  //Formulario
  public formBuscar:FormGroup = this.fb.group({
    ciclo: [ , Validators.required ],
    semana: [ , Validators.required ]
  });
  //Formulario Sobre
  public sobre: FormGroup = this.fb.group({
    celula: [ , [Validators.required,  this.campoMayorACero  ] ],
    semana: [ , [Validators.required, this.campoMayorACero] ],
    miembros: [ , [Validators.required, this.campoMayorACero] ],
    visitas: [ , [Validators.required, this.campoMayorACero]],
    ninos: [ , [Validators.required, this.campoMayorACero]],
    diezmoLider: [ , [Validators.required, this.campoMayorACero]],
    ofrenda: [ ,[Validators.required, this.campoMayorACero]],
    culto_hecho: [ 1 ]
  });

  constructor( private datos:DatosService, 
                private router:Router, 
                private conexion:ConexionService,
                private fb: FormBuilder ) {
    this.fechaHoy = conexion.fechahoy();
    this.loaderCelulas = true;
  }

  ngOnInit(): void {
    this.permiso();
  }

  // Si Cuenta no tiene acceso Enviar a Home
  private permiso(){
    let cuenta = this.datos.getCuenta();
    let acceso = this.datos.getPermiso();
    if(cuenta !== "Admin" || acceso === "acceso denegado"){
      this.router.navigate(['home/inicio']); // Sin acceso enviar al Home
    }else{
      this.leerPeriodo();
    }
  }
  //Leer Periodo
  private leerPeriodo(){
    this.loader = true;
    let hoy: string = this.conexion.fechahoy();
    this.conexion.leerPeriodos().subscribe( (periodos: Periodo[]) =>{
      this.listPeriodos = periodos;
      periodos.forEach( (periodo:Periodo) => {
        // fecha Inicial menor a Fhoy y fechaFinal mayor a Fhoy
        if( periodo.fechaInicial <= hoy && periodo.fechaFinal >= hoy){
          this.periodoActual = periodo;
          //rellenar Campos del Formulario
          this.semana = this.datos.calcularSemana( periodo );
          let s = this.semana
          // atrasar 1 semana
          if( s > 1 ){
              s--;
          }
          // 
          this.formBuscar.reset({
            ciclo : periodo.nombre,
            semana : s,

          });
          this.loader = false;
        }
      });
    })
  }

  public listSobres(){
    if( this.formBuscar.invalid ){
      this.formBuscar.markAllAsTouched();
      return
    }
    if( this.formBuscar.controls.semana.value <= 0 ){
      return
    }
    this.loader = true;
    const { ciclo, semana } = this.formBuscar.value;
    this.periodoNom = "S-"+ciclo;
    this.conexion.leerSobresSemana( semana, this.periodoNom ).subscribe( (sobres: Sobre[]) =>{
      this.ordenarSobres(sobres);
      this.loader = false;
    });
  }
  // Ordenar Sobres
  private ordenarSobres( s:Sobre[] ){
    // Ordernar por numero de Celula
    s.sort(function(a, b) {
      return a.celula - b.celula;
    });
    this.sobres = s;
  }
  //************ Validar NUMERO DE CELULA ***************************************************************
  /*
  public numeroCelulaValido(){
    const { celula } = this.formCelulaEdit.value;
    return this.jve.celulaExiste( celula ) && this.formCelulaEdit.controls.celula.touched;
  }*/
  //************************************************************************************************************ */
  

  //****************************************************************** */

  public sobreVerificado(s:Sobre){
    this.sobreVerificar = s;
  }

  public editarSobre( verificacion: boolean ){
    this.loader = true;
    // Si no esta verificado Verificar si no Des-verificar
    this.sobreVerificar.verificado = verificacion;
    // ID ciclo Sobres
    this.conexion.editarSobre( this.sobreVerificar, this.periodoNom ).then( ()=>{
      this.loader = false;
    });
  }
  public borrarSobre(){
    this.loader = false;
    this.conexion.eliminarSobre( this.sobreVerificar, this.periodoNom ).then( ()=>{
      this.loader = false;
    });
  }
  public sobreFormulario(s:Sobre){
    this.sobreVerificar = s;
    this.sobre.reset({
      celula: s.celula ,
      semana: s.semana ,
      miembros: s.miembros ,
      visitas: s.visitas ,
      ninos: s.ninos ,
      diezmoLider: s.diezmoLider ,
      ofrenda: s.ofrenda,
      culto_hecho: s.culto_hecho
    })
  }
  public editarSobreFormulario( verificacion: boolean ){
    if(this.sobre.invalid){
      this.sobre.markAllAsTouched();
      return
    }
    this.loader = true;
    // datos del Formulario
    const { celula, semana, miembros, visitas, ninos, diezmoLider, ofrenda, culto_hecho } = this.sobre.value;
    
    this.sobreVerificar.celula = celula;
    this.sobreVerificar.semana = semana;
    this.sobreVerificar.miembros = miembros;
    this.sobreVerificar.visitas = visitas;
    this.sobreVerificar.ninos = ninos;
    this.sobreVerificar.diezmoLider = diezmoLider;
    this.sobreVerificar.ofrenda = ofrenda;
    this.sobreVerificar.verificado = true;
    this.sobreVerificar.culto_hecho = Number(culto_hecho);
    // ID ciclo Sobres
    this.conexion.editarSobre( this.sobreVerificar, this.periodoNom ).then( ()=>{
      this.loader = false;
    });
  }
  // Nuevo Sobre
  public newSobreFormulario(){
    // Traer todos las Celulas Existentes
    if( !this.allCelulas ){
      this.loader = true;
      this.loaderCelulas = true;
      const { ciclo } = this.formBuscar.value;
      const id = "C-"+ciclo;
      this.conexion.leerCelulas(id).subscribe( (celulas:Celula[]) =>{
        this.allCelulas = celulas;
        this.loaderCelulas = false;
        this.loader = false;
      });
    }
    //semana
    const { semana } = this.formBuscar.value;

    this.sobre.reset({
      celula: 0 ,
      semana: semana ,
      miembros: 0 ,
      visitas: 0 ,
      ninos: 0 ,
      diezmoLider: 0 ,
      ofrenda: 0,
      culto_hecho : 1
    })
  }
  // Guardar Nuevo Sobre
  public agregarSobreFormulario(){
    if(this.sobre.invalid){
      this.sobre.markAllAsTouched();
      return
    }
    this.loader = true;
    // datos del Formulario
    const { celula, semana, miembros, visitas, ninos, diezmoLider, ofrenda, culto_hecho } = this.sobre.value;
    // Filtrar Celula Repetida
    const listaSobres = this.sobres.filter(s => s.celula == celula);
    // Si celula es repetida Salir
    if( listaSobres.length > 0 ){
      this.loader = false;
      this.sobreRepetido = true;
      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        this.sobreRepetido = false;
      },5000);
      return
    }

    const nuevoSobre:Sobre = {
      fechaRegistro : this.conexion.fechahoy(),
      celula : celula,
      semana : semana,
      miembros : miembros,
      visitas : visitas,
      ninos : ninos,
      diezmoLider : diezmoLider,
      ofrenda : ofrenda,
      verificado : true,
      culto_hecho : Number(culto_hecho)
    }
    // ID ciclo Sobres
    this.conexion.addSobre( nuevoSobre, this.periodoNom ).then( ()=>{
      this.loader = false;
      // RESET Formulario
      const { semana } = this.formBuscar.value;
      this.sobre.reset({
        celula: 0 ,
        semana: semana ,
        miembros: 0 ,
        visitas: 0 ,
        ninos: 0 ,
        diezmoLider: 0 ,
        ofrenda: 0,
        culto_hecho : 1
      })
      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        this.celulaInputElement.nativeElement.focus(); 
      },0);
    });
  }

  public campoValido( campo: string){
    return this.sobre.controls[campo].touched
          && this.sobre.controls[campo].invalid;
  }
  // Buscar Si la Celula Existe
  public celulaExiste(){
    const { celula } = this.sobre?.value;
    
    if( this.loaderCelulas == false ){
      const result = this.allCelulas?.filter( (c:Celula) => c.Celula == celula );
      if( result.length <= 0){
        this.sobre.controls?.celula.setErrors({ celulaNoExiste: true });
        return true
      }
    }
    this.sobre.controls?.celula.setErrors(null);
    return false;
  }
  // Campo no puede ser menor a 0
  public campoMayorACero(control: FormControl){
    const campo:number = control?.value;
    if( campo < 0 ){
      return { menorACero: true }
    }
    return null;
  }

}


