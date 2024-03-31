import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BautismoService } from 'src/app/services/bautismo.service';
import { DatosService } from 'src/app/services/datos.service';
import { InfoJveService } from 'src/app/services/info-jve.service';
import { SobresService } from '../../../services/sobres.service';
import { Celula } from '../../interfaces/inferfaces';

@Component({
  selector: 'app-debe-sobres',
  templateUrl: './debe-sobres.component.html',
  styleUrls: ['./debe-sobres.component.css']
})
export class DebeSobresComponent implements OnInit {

  public mostrarTabla = false;
  public load: boolean = false;
  public fechaHoy: string;
  public cuenta: string;
  public ciclo:string;
  public numeroSemanas:number;

  private fechaIciclo: string;
  private fechaFciclo: string;

  // Todas las celulas Ordenadas 
  get tablas(){
    return this.jve.tablas;
  }
  get listaDebeSobres(){
    this.load = false;
    return this.sobre.listaSobresC;
  }
  get semanaActual(){
    return (this.sobre.ultimasemana-1);
  }
  public semanasTablaDebeSobre: any[] =[];
  

  constructor(  private sobre: SobresService,
                private datos: DatosService,
                private router: Router,
                private jve: InfoJveService,
  ) {
    this.load = false;
  }

  ngOnInit(): void {
    this.fechaHoy = this.jve.fechahoy();
    this.permiso();
  }

  // Si Cuenta no tiene acceso Enviar a Home
  private permiso(){
    this.cuenta = this.datos.getCuenta();
    let acceso = this.datos.getPermiso();
    if( this.cuenta === "Celula" || acceso === "acceso denegado" ){
      this.router.navigate(['home/inicio']); // Sin acceso enviar al Home
    }
  }

  public nombreSubC(c:number,s:number){
    return this.jve.cualNombreS(c,s);
  }

  public nombreCoord(c:number){
    return this.jve.cualNombreC(c);
  }

  public color( x:number ){
    if(x == 0)
    return"color-supervisor";//rojo
  }

  public obtenerCiclo( ciclo:any ){
    
    this.load = true;
    this.ciclo = ciclo.ciclo;
    this.numeroSemanas = ciclo.nSemanas;
    this.fechaIciclo = ciclo.fechaI;
    this.fechaFciclo = ciclo.fechaF;
    const coordinacionSelect:number = Number( ciclo.coordinacion );
    //id Sobres
    const sId: string = "S-" + ciclo.ciclo;
    // id Celulas
    const cId: string = "C-" + ciclo.ciclo;
    //Inicializar Lista de Celulas
    if( (this.cuenta === "Admin" || this.cuenta === "Director") && coordinacionSelect < 0 ){
      // Traer Todas Las Celulas
      this.jve.celulas(cId, false, false);
      // Todos los Sobres
      this.sobre.AllSobresCiclo( sId );
    }else{ // Traer Todas Las Celulas y Sobres de una COORDINACION
      // Cuenta Nivel Administrador o Director
      if( this.cuenta === "Admin" || this.cuenta === "Director" ){
        const coord:number = coordinacionSelect;// Numero de Coordinacion
        this.jve.celulasCoordinacion( cId, coord, false, false );
        // Sobres de la coordinacion
        this.sobre.CoordSobresCiclo( sId, coord );
      }else{
        // Cuenta Nivel Coordinador
        const coord:number = this.datos.getNumero(); // Numero de Coordinacion
        this.jve.celulasCoordinacion( cId, coord, false, false );
        //Sobres de la coordinacion
        this.sobre.CoordSobresCiclo( sId, coord );
      }
    }
    // Nombres ID
    const idN: string = "N-" + ciclo.ciclo;
    //Inicializar Lista de Nombres
    this.jve.nombres(idN);
    // Bolean Mostrar Tabla
    this.mostrarTabla = true;
  }

  public existeSobre( celula: number, semana: number ){
    console.log( this.semanaActual );
    if( this.semanaActual >= semana ){
      const x = this.listaDebeSobres.filter( s => s.celula == celula && s.semana == semana );
      if( x.length > 0 ){
        return "✔";
      }else return "x";
    }
    return "";
  }

  public calcularSemana( f:string ){
    let semana = 0;
    let fecha = new Date( f );
    let fechaI = new Date( this.fechaIciclo );
    let fechaF = new Date( this.fechaFciclo );
    //
    if( fecha <= fechaI ){
      return 0;
    }
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
    
    while( fechaI <= fecha && fechaI <= fechaF ){
      semana++;
      fechaI.setDate(fechaI.getDate() + 7 );
    }
    return semana;
  }

  public modificarListaSobres( celula: Celula ){
    const semanaSobre = (this.calcularSemana( celula.fechaSobre ));
    // reset lista
    this.semanasTablaDebeSobre = [];
    // Si la celula es == 0 es un supervisor no poner datos
    if( celula.Celula == 0 ){
      for( let i=0; i< this.numeroSemanas; i++ ){
        this.semanasTablaDebeSobre[i] = "";
      }
    // SINO llenar con datos
    }else{
      for( let i=0; i< this.numeroSemanas; i++ ){
        if( this.semanaActual >= i && semanaSobre < i ){
          this.semanasTablaDebeSobre[i] = "x";
        }else{
          this.semanasTablaDebeSobre[i] = "";
        }
      }
      // Buscar Sobre con ese numero de celula
      const sobres = this.listaDebeSobres.filter( s => s.celula == celula.Celula );
      //Recorrer cada sobre y añadirlo ala lista
      if( sobres.length > 0 ){
        sobres.forEach( s =>{
          const idS = s.semana-1;
          if( s.verificado ){
            if( s.culto_hecho == 1 ){
              const t = s.ofrenda + s.diezmoLider;
              if( t <= 0 ){
                this.semanasTablaDebeSobre[idS] = "Φ";
              }else{
                this.semanasTablaDebeSobre[idS] = "✓";
              }
            }else if( s.culto_hecho == 0 ){
              this.semanasTablaDebeSobre[idS] = "¢";
            }else if( s.culto_hecho == 2 ){
              this.semanasTablaDebeSobre[idS] = "š";
            }
            
          }else{
            this.semanasTablaDebeSobre[idS] = "•";
          }
        });
      }
    }
  }
}
