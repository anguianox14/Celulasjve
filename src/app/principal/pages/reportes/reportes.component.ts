import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../../services/conexion.service';
import { Celula, Periodo, Sobre } from '../../interfaces/inferfaces';
import { DatosService } from '../../../services/datos.service';
import { Router } from '@angular/router';
import { InfoJveService } from '../../../services/info-jve.service';
import { SobresService } from '../../../services/sobres.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public mostrarTabla: boolean;

  public load: boolean;

  public cuenta: string;
  public acceso: string;
  public ciclo: string;

  public ultimaSubC: boolean; // true para guardar la ultima SubCoord
  public fechaHoy: string;

  public semana:number;
  public inactivas: boolean;

  public subCoordinacion: Celula[]; // Lista Por SubCoordinacion
  public subCoorActual: number;
  public coordActual: number;

  get jsonSobres(){
    return this.sobresS.jsonSobres;
  }
  get tablas(){
    this.load = false;
    return this.jve.tablas;
  }

  constructor(  private sobresS: SobresService,
                private jve: InfoJveService,
                private conexion: ConexionService, 
                private datos: DatosService, 
                private router:Router ) {
  }

  ngOnInit(): void {
    this.permiso();
    this.fechaHoy = this.conexion.fechahoy();
  }

  // Si Cuenta no tiene acceso Enviar a Home
  private permiso(){
    this.cuenta = this.datos.getCuenta();
    this.acceso = this.datos.getPermiso();
    if(this.cuenta === "Celula" || this.acceso === "acceso denegado"){
      this.router.navigate(['home/inicio']); // Sin acceso enviar al Home
    }
  }

  public obtenerCiclo( ciclo:any ){
    this.mostrarTabla = true;
    this.load = true;
    this.ciclo = ciclo.ciclo;
    this.semana = ciclo.semana;
    const coordinacionSelect:number = Number( ciclo.coordinacion );
    // id Sobres
    const sId: string = "S-"+this.ciclo; // ID de la Tabla Celulas
    // id Celulas
    const cId: string = "C-" + ciclo.ciclo;
    // Todos los sobres hace 5 semanas
    this.sobresS.sobres5semanas(this.semana,sId,"datos" );
    //Inicializar Lista de Celulas
    if( (this.cuenta === "Admin" || this.cuenta === "Director") && coordinacionSelect < 0 ){
      // Todas Las Celulas
      this.jve.celulas(cId, false, false);
    }else{
      // Cuenta Nivel Administrador
      if( this.cuenta === "Admin" || this.cuenta === "Director" ){
        const coord:number = coordinacionSelect;
        // Celulas de la coordinacion
        this.jve.celulasCoordinacion( cId, coord, false, false );
      }else{
        // Cuenta Nivel Coordinador
        const coord:number = this.datos.getNumero(); // Numero de Coordinacion
        // Celulas de la coordinacion
        this.jve.celulasCoordinacion( cId, coord, false, false );
      }
    }
    // Nombres ID
    const idN: string = "N-" + ciclo.ciclo;
    //Inicializar Lista de Nombres
    this.jve.nombres(idN);
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

  public textColor( s:any ){
    let clase: string = "";
    if( (s+"") === "NC" ){
      clase = "text-danger letras";
    }else if( (s+"") === "SD" ){
      clase = "text-warning letras";
    }
    return clase;
  }

}
