import { Injectable } from '@angular/core';
import { ConexionService } from './conexion.service';
import { Sobre } from '../principal/interfaces/inferfaces';

@Injectable({
  providedIn: 'root'
})
export class SobresService {

  private idAnterior="id";
  public listaSobresC :Sobre[] = [];
  public semanasTablaDebeSobre: any[] = [];
  public ultimasemana: number=0;

  public jsonSobres: any[]=[];

  constructor( private conexion: ConexionService ) { }

  // Reporte Debe Sobre All Sobres
  public AllSobresCiclo( id:string ){
    // Si ID (ciclo) anterior es diferente Consultar en BD
    if( this.idAnterior !== id ){
      this.conexion.leerSobresCiclo(id).subscribe( s=>{
        this.ultimasemana = 0;
        s.forEach( ss=>{
          // Semana mas Alto
          if( this.ultimasemana < ss.semana ){
            this.ultimasemana = ss.semana;
          }
        });
        this.listaSobresC = s;
      });
    }
  }
  // Reporte Debe Sobre Coordinador Sobres
  public CoordSobresCiclo( id:string, coord:number ){
    // Si ID (ciclo) anterior es diferente Consultar en BD
      this.conexion.leerSobresCoordCiclo(id,coord).subscribe( s=>{
        this.ultimasemana = 0;
        s.forEach( ss=>{
          // Semana mas Alto
          if( this.ultimasemana < ss.semana ){
            this.ultimasemana = ss.semana;
          }
        });
        this.listaSobresC = s;
      });
  }

  public sobres5semanas( semanaI:number  , id: string, formato: string  ){
    this.conexion.leer5Sobres( semanaI ,id).subscribe( (sobres:Sobre[]) => {
      if( formato == "datos" ){
        this.addSobresTabla( sobres, semanaI );
      }else if( formato == "ofrenda" ){
        this.addSobresOfrandaTabla( sobres, semanaI );
      }
    }) 
  }

  // Agregar los sobres al Reporte
  private addSobresTabla( sobres: Sobre[], semana:number ){
    // Resetear Array Sobres
    this.jsonSobres = [];

    sobres.forEach( (s:Sobre) => {
      // Add Json vacio en el indice de la celula
      if( !this.jsonSobres[s.celula] ){
        this.jsonSobres[s.celula] = { s1:[,,,],s2:[,,,],s3:[,,,],s4:[,,,],s5:[,,,] };
      }
      // Modificar el JSON con la Informacion del Sobre
      if(s.semana == semana){
        if( s.culto_hecho == 1 ){   // Se Realizo el Culto
          this.jsonSobres[s.celula].s1[0] = s.miembros;
          this.jsonSobres[s.celula].s1[1] = s.visitas;
          this.jsonSobres[s.celula].s1[2] = s.ninos;
          this.jsonSobres[s.celula].s1[3] = s.miembros + s.ninos + s.visitas;
        }else if( s.culto_hecho == 0 ){// No Realizo el Culto
          this.jsonSobres[s.celula].s1=["NC","NC","NC","NC"];
        }else if( s.culto_hecho == 2 ){// Sobre Sin Datos
          this.jsonSobres[s.celula].s1=["SD","SD","SD","SD"];
        }
      }else if(s.semana == semana-1){
        if( s.culto_hecho == 1 ){   // Se Realizo el Culto
          this.jsonSobres[s.celula].s2[0] = s.miembros;
          this.jsonSobres[s.celula].s2[1] = s.visitas;
          this.jsonSobres[s.celula].s2[2] = s.ninos;
          this.jsonSobres[s.celula].s2[3] = s.miembros + s.ninos + s.visitas;
        }else if( s.culto_hecho == 0 ){// No Realizo el Culto
          this.jsonSobres[s.celula].s2=["NC","NC","NC","NC"];
        }else if( s.culto_hecho == 2 ){// Sobre Sin Datos
          this.jsonSobres[s.celula].s2=["SD","SD","SD","SD"];
        }
      }else if(s.semana == semana-2){
        if( s.culto_hecho == 1 ){   // Se Realizo el Culto
          this.jsonSobres[s.celula].s3[0] = s.miembros;
          this.jsonSobres[s.celula].s3[1] = s.visitas;
          this.jsonSobres[s.celula].s3[2] = s.ninos;
          this.jsonSobres[s.celula].s3[3] = s.miembros + s.ninos + s.visitas;
        }else if( s.culto_hecho == 0 ){// No Realizo el Culto
          this.jsonSobres[s.celula].s3=["NC","NC","NC","NC"];
        }else if( s.culto_hecho == 2 ){// Sobre Sin Datos
          this.jsonSobres[s.celula].s3=["SD","SD","SD","SD"];
        }
      }else if(s.semana == semana-3){
        if( s.culto_hecho == 1 ){   // Se Realizo el Culto
          this.jsonSobres[s.celula].s4[0] = s.miembros;
          this.jsonSobres[s.celula].s4[1] = s.visitas;
          this.jsonSobres[s.celula].s4[2] = s.ninos;
          this.jsonSobres[s.celula].s4[3] = s.miembros + s.ninos + s.visitas;
        }else if( s.culto_hecho == 0 ){// No Realizo el Culto
          this.jsonSobres[s.celula].s4=["NC","NC","NC","NC"];
        }else if( s.culto_hecho == 2 ){// Sobre Sin Datos
          this.jsonSobres[s.celula].s4=["SD","SD","SD","SD"];
        }
      }else if(s.semana == semana-4){
        if( s.culto_hecho == 1 ){   // Se Realizo el Culto
          this.jsonSobres[s.celula].s5[0] = s.miembros;
          this.jsonSobres[s.celula].s5[1] = s.visitas;
          this.jsonSobres[s.celula].s5[2] = s.ninos;
          this.jsonSobres[s.celula].s5[3] = s.miembros + s.ninos + s.visitas;
        }else if( s.culto_hecho == 0 ){// No Realizo el Culto
          this.jsonSobres[s.celula].s5=["NC","NC","NC","NC"];
        }else if( s.culto_hecho == 2 ){// Sobre Sin Datos
          this.jsonSobres[s.celula].s5=["SD","SD","SD","SD"];
        }
      }
    })
  }
  // Agregar los sobres al Reporte
  private addSobresOfrandaTabla( sobres: Sobre[], semana:number ){
    // Resetear Array Sobres
    this.jsonSobres = [];

    sobres.forEach( (s:Sobre) => {
      // Add Json vacio en el indice de la celula
      if( !this.jsonSobres[s.celula] ){
        this.jsonSobres[s.celula] = { s1:[,,],s2:[,,],s3:[,,],s4:[,,],s5:[,,] };
      }
      // Modificar el JSON con la Informacion del Sobre
      if(s.semana == semana && s.verificado == true){
        this.jsonSobres[s.celula].s1[0] = s.ofrenda
        this.jsonSobres[s.celula].s1[1] = s.diezmoLider
        this.jsonSobres[s.celula].s1[2] = s.ofrenda + s.diezmoLider;
      }else if(s.semana == semana-1 && s.verificado == true){
        this.jsonSobres[s.celula].s2[0] = s.ofrenda;
        this.jsonSobres[s.celula].s2[1] = s.diezmoLider;
        this.jsonSobres[s.celula].s2[2] = s.ofrenda + s.diezmoLider;
      }else if(s.semana == semana-2 && s.verificado == true){
        this.jsonSobres[s.celula].s3[0] = s.ofrenda;
        this.jsonSobres[s.celula].s3[1] = s.diezmoLider;
        this.jsonSobres[s.celula].s3[2] = s.ofrenda + s.diezmoLider;
      }else if(s.semana == semana-3 && s.verificado == true){
        this.jsonSobres[s.celula].s4[0] = s.ofrenda;
        this.jsonSobres[s.celula].s4[1] = s.diezmoLider;
        this.jsonSobres[s.celula].s4[2] = s.ofrenda + s.diezmoLider;
      }else if(s.semana == semana-4 && s.verificado == true){
        this.jsonSobres[s.celula].s5[0] = s.ofrenda;
        this.jsonSobres[s.celula].s5[1] = s.diezmoLider;
        this.jsonSobres[s.celula].s5[2] = s.ofrenda + s.diezmoLider;
      }
    })
  }
}
