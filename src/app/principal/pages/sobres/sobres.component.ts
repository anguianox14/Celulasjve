import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConexionService } from '../../../services/conexion.service';
import { Router } from '@angular/router';
import { Periodo, Sobre, Celula } from '../../interfaces/inferfaces';
import { DatosService } from '../../../services/datos.service';

@Component({
  selector: 'app-sobres',
  templateUrl: './sobres.component.html',
  styleUrls: ['./sobres.component.css']
})
export class SobresComponent implements OnInit {
  //Formulario Visible
  public formulario: boolean = false;
  //Loader
  public loader:boolean = false;
  //numero celula
  public celulaActiva:boolean=false;
  public celula: number;
  public semanaG: number;
  public periodoG: string;

  //Formulario Sobre
  public sobre: FormGroup = this.fb.group({
    celula: [ , Validators.required ],
    semana: [ , Validators.required ],
    miembros: [ 0, Validators.required ],
    visitas: [ 0, Validators.required],
    ninos: [ 0, Validators.required],
    diezmoLider: [ 0, Validators.required],
    ofrenda: [ 0, Validators.required],
    culto_hecho: [ 1 ]
  });
  //Sobre Firebase
  public sobreF: Sobre = {
    celula: 0,
    semana: 0,
    miembros: 0,
    visitas: 0,
    ninos: 0,
    diezmoLider: 0,
    ofrenda: 0,
    verificado: false,
    fechaRegistro : this.conexion.fechahoy(),
    culto_hecho : 1
  }

  constructor( private fb: FormBuilder, 
                private conexion: ConexionService, 
                private router: Router,
                private datos: DatosService) { }

  ngOnInit(): void {
    this.permiso();
  }
  // Si Cuenta no tiene acceso Enviar a Home
  private permiso(){
    let cuenta = this.datos.getCuenta();
    let acceso = this.datos.getPermiso();
    if(cuenta !== "Celula" || acceso === "acceso denegado"){
      this.router.navigate(['home/inicio']); // Sin acceso enviar al Home
    }else{
      this.leerPeriodo();
    }
  }
  //Leer Periodo
  private leerPeriodo(){
    this.celula = this.datos.getNumero();
    let hoy: string = this.conexion.fechahoy();
    this.conexion.leerPeriodos().subscribe( (periodos: Periodo[]) =>{
      periodos.forEach( (periodo:Periodo) => {
        // fecha Inicial menor a Fhoy yy fechaFinal mayor a Fhoy
        if( periodo.fechaInicial <= hoy && periodo.fechaFinal >= hoy){
          this.periodoG = periodo.nombre;
          this.calcularSemana( periodo );
        }
      });
    })
  }
  //Calcular Semana
  private calcularSemana(periodo: Periodo){
    let fechaI = new Date(periodo.fechaInicial);
    //** Calcular primer Martes del Periodo ********************************************/
    let dias = 0; // Número de días a agregar
    let dia = fechaI.getDay();
    for(let i=0;i<=6;i++){
      if( dia < 2 ){
        dias++;
        dia++;
      }else if( dia > 2){
        dias--;
        dia--;
      }
      if( dia == 2 ){
        i=7;
      }
    }
    fechaI.setDate(fechaI.getDate() + dias );
    //**Calcular Semana Actual************************************************************ */
    const hoyF = new Date(); // fecha Actual
    let semana = 0;
    while( fechaI <= hoyF ){
      semana++;
      fechaI.setDate(fechaI.getDate() + 7 );
    }
    //Semana Global
    this.semanaG = semana;
    //Formulario
    this.sobre.controls.celula.setValue( this.celula );
    this.sobre.controls.semana.setValue( semana );
    /*this.sobre.reset({
      celula: this.celula,
      semana: semana,
    });*/
    // Verificar Celula
    this.verificarCelula();
    //leerSobre
    this.leerSobre();
  }
  //Verificar que Celula Existe
  private verificarCelula(){
    // Id
    const id = "C-"+this.periodoG;
    this.conexion.leer1Celula( id, this.celula ).then( res=>{
      const document:any = res.docs;
      // Si Celula No Existe
      if( res.empty ){
        this.celulaActiva = true;
      }
      document.forEach( object =>{
        const c:any = object.data();
        if(c.estado = 0){
          this.celulaActiva = true;
        }
      });
    });
  }
  //******************************************************************************* */
  private leerSobre(){
    this.loader = true;
    const id = "S-"+this.periodoG;
    let sobres: Sobre[] = [];
    this.conexion.leer1SobreCelula( id, this.celula, this.semanaG ).then( res =>{
      const document = res.docs;
      document.forEach( object =>{
        const obj:any = object.data();
        const s:Sobre = {
          celula: obj.celula,
          semana: obj.semana,
          miembros: obj.miembros,
          visitas: obj.visitas,
          ninos: obj.ninos,
          diezmoLider: obj.diezmoLider,
          ofrenda: obj.ofrenda,
          verificado: obj.verificado,
          id:  object.id,
        }
        sobres.push(s);
      })
      this.loader = false;
      this.formulario = this.buscarSobre(sobres);
    }).catch( er =>{
      console.log(er);
    });
  }

  private buscarSobre(s:Sobre[]):boolean {
    let mostrar:boolean = true;
    s.forEach( sobre =>{
      if(sobre.semana == this.semanaG){
        mostrar = false;
      }
    });
    return mostrar;
  }
  //******************************************************************************* */
  //******************************************************************************* */
  //***************************** */

  public campoValido( campo: string){
    return this.sobre.controls[campo].touched
          && this.sobre.controls[campo].value < 0;
  }

  //********************** guardar Sobre ****************************
  public sendSobre(){
    if(this.sobre.invalid){
      this.sobre.markAllAsTouched();
      return;
    }
    this.loader = true;
    // datos
    const { celula, semana, miembros, visitas, ninos, diezmoLider, ofrenda, culto_hecho } = this.sobre.value;
    this.sobreF.celula = this.celula;
    this.sobreF.semana = this.semanaG;
    this.sobreF.miembros = miembros;
    this.sobreF.visitas = visitas;
    this.sobreF.ninos = ninos;
    this.sobreF.ofrenda = ofrenda;
    this.sobreF.diezmoLider = diezmoLider;
    this.sobreF.culto_hecho = Number(culto_hecho);
    //add
    const id:string = "S-"+this.periodoG;
    this.conexion.addSobre(this.sobreF,id).then( () =>{
      this.loader = false;
      this.formulario = false;
    }).catch(er =>{
      console.log(er);
    });
  }
}
