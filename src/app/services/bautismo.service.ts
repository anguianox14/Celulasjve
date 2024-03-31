import { Injectable } from '@angular/core';
import { Bautismo } from '../principal/interfaces/inferfaces';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class BautismoService {

  private idAnteriorP: string = "id";
  private idAnteriorC: string = "id";

  private periodoAnterior: number = -100;

  // Periodo mas alto del ciclo
  public ultimoPeriodo: number = 0;

  public listbautismosP: Bautismo[];
  public listbautismosC: any[] = [];

  constructor( private conexion: ConexionService ) { }

  // Buscar Los Bautismos del Periodo
  public bautismosPeriodo( id:string, periodo:number ){
    // Si ID (ciclo) anterior es diferente Consultar en BD
    if( this.idAnteriorP !== id ||  periodo !== this.periodoAnterior ){
      // Asignar ciclo nuevo al ID anterior
      this.idAnteriorP = id;
      // Consultar
      this.conexion.leerBautismoPeriodo(id,periodo).subscribe( (b:Bautismo[])=>{
        this.ordenarBautismos(b);
      })
    }
  }
  // Ordenar Bautismos
  private ordenarBautismos( b:Bautismo[] ){
    // Ordernar por numero de Celula
    b.sort(function(a, b) {
      return a.celula - b.celula;
    });
    this.listbautismosP = b;
  }
  // BUSCAR LOS Bautismos del Ciclo
  public bautismosCiclo( id:string ){
    // Si ID (ciclo) anterior es diferente Consultar en BD
    if( this.idAnteriorC !== id ){
      // Asignar ciclo nuevo al ID anterior
      this.idAnteriorC = id;
      // Consultar
      this.conexion.leerBautismoCiclo(id).subscribe( (b:Bautismo[])=>{
        this.listbautismosC = [];
        this.addBautismosTabla(b);
      })
    }
  }
  // BUSCAR LOS Bautismos del Ciclo De la COORDINACION
  public bautismosCicloCoord( id:string, coord:number ){
      // Consultar
      this.conexion.leerBautismoCicloCoord(id, coord).subscribe( (b:Bautismo[])=>{
        this.listbautismosC = [];
        this.addBautismosTabla(b);
      })
  }

  public addBautismosTabla( bautismos:Bautismo[] ){
    // Crear Lista
    bautismos.forEach( b=>{
      // Periodo mas Alto
      if( this.ultimoPeriodo < b.periodo ){
        this.ultimoPeriodo = b.periodo;
      }
      const c = b.celula;
      this.listbautismosC[c] = { p1:0, p2:0, p3:0, p4:0, p5:0, p6:0, p7:0, p8:0, p9:0, p10:0, t:0};//10 periodos + Total
    });
    bautismos.forEach( b=>{
      const c = b.celula;
      const p = b.periodo;
      // Depende del periodo Sumar +1
      switch(p){
        case 1: this.listbautismosC[c].p1 = this.listbautismosC[c].p1 + 1; break;
        case 2: this.listbautismosC[c].p2 = this.listbautismosC[c].p2 + 1; break;
        case 3: this.listbautismosC[c].p3 = this.listbautismosC[c].p3 + 1; break;
        case 4: this.listbautismosC[c].p4 = this.listbautismosC[c].p4 + 1; break;
        case 5: this.listbautismosC[c].p5 = this.listbautismosC[c].p5 + 1; break;
        case 6: this.listbautismosC[c].p6 = this.listbautismosC[c].p6 + 1; break;
        case 7: this.listbautismosC[c].p7 = this.listbautismosC[c].p7 + 1; break;
        case 8: this.listbautismosC[c].p8 = this.listbautismosC[c].p8 + 1; break;
        case 9: this.listbautismosC[c].p9 = this.listbautismosC[c].p9 + 1; break;
        case 10: this.listbautismosC[c].p10 = this.listbautismosC[c].p10 + 1; break;
      }
      // Sumar Total
      this.listbautismosC[c].t = this.listbautismosC[c].t + 1; // mas 1 en el Total
    });

  }


}
