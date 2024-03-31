import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from 'src/app/services/conexion.service';
import { DatosService } from 'src/app/services/datos.service';
import { InfoJveService } from 'src/app/services/info-jve.service';
import { SobresService } from 'src/app/services/sobres.service';
import { Celula, Periodo } from '../../interfaces/inferfaces';

@Component({
  selector: 'app-reporte-ofrenda',
  templateUrl: './reporte-ofrenda.component.html',
  styleUrls: ['./reporte-ofrenda.component.css']
})
export class ReporteOfrendaComponent implements OnInit {

  public mostrarTabla: boolean;

  public load: boolean;

  public cuenta: string;
  public acceso: string;
  public ciclo: string;

  public ultimaSubC: boolean; // true para guardar la ultima SubCoord
  public fechaHoy: string;

  public listPeriodos: Periodo[];
  public semana:number;
  public inactivas: boolean;

  public subCoordinacion: Celula[]; // Lista Por SubCoordinacion
  public subCoorActual: number;
  public coordActual: number;

  public suscribreSobres: boolean;  // Suscribe 1 vez Sobres
  
  get jsonSobres(){
    return this.sobresS.jsonSobres;
  }

  get tablas(){
    this.load = false;
    return this.jve.tablas;
  }

  constructor(
              private sobresS: SobresService,
              private jve: InfoJveService,
              private conexion: ConexionService, 
              private datos: DatosService, 
              private router:Router
  ) { }

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
    // id
    const sId: string = "S-"+this.ciclo; // ID de la Tabla Celulas
    this.sobresS.sobres5semanas(this.semana,sId,"ofrenda");
    // id
    const cId: string = "C-" + ciclo.ciclo;
    //Inicializar Lista de Celulas
    if( this.cuenta === "Admin" && coordinacionSelect < 0 ){
      this.jve.celulas(cId, false, false);
    }else{
      // Cuenta Nivel Administrador
      if( this.cuenta === "Admin" ){
        const coord:number = coordinacionSelect;
        this.jve.celulasCoordinacion( cId, coord, false, false );
      }else{
        // Cuenta Nivel Coordinador
        const coord:number = this.datos.getNumero(); // Numero de Coordinacion
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


}
