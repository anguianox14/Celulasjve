import { Component, OnInit } from '@angular/core';
import { BautismoService } from '../../../services/bautismo.service';
import { InfoJveService } from '../../../services/info-jve.service';
import { DatosService } from '../../../services/datos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte-bautismo',
  templateUrl: './reporte-bautismo.component.html',
  styleUrls: ['./reporte-bautismo.component.css']
})
export class ReporteBautismoComponent implements OnInit {

  public mostrarTabla:boolean = false;
  public load: boolean;
  public ciclo: string;
  public fechaHoy: string;
  public cuenta: string;
  public totalesBautismos: number[][];

  // Todos los Bautismos del ciclo
  get listaBautismos(){
    return this.bautismosS.listbautismosC;
  }
  // Todas las celulas Ordenadas
  get tablas(){
    this.load = false;
    return this.jve.tablas;
  }
  //
  get periodoMayor(){
    return this.bautismosS.ultimoPeriodo;
  }

  constructor( private datos: DatosService,
              private router: Router,
              private jve: InfoJveService,
              private bautismosS: BautismoService
    ) {
      this.totalesBautismos = [];
      this.resetTotalesBautismos(0);
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

  public obtenerCiclo( ciclo:any ){
    this.mostrarTabla = true;
    this.load = true;
    this.ciclo = ciclo.ciclo;
    const coordinacionSelect:number = Number( ciclo.coordinacion );
    // id Bautismos
    const bId: string = "B-" + ciclo.ciclo;
    // id Celulas
    const cId: string = "C-" + ciclo.ciclo;
    //Inicializar Lista de Celulas
    if( (this.cuenta === "Admin" || this.cuenta === "Director") && coordinacionSelect < 0 ){
      // Todas las Celulas
      this.jve.celulas(cId, false, false);
      // Todos los Bautismos
      this.bautismosS.bautismosCiclo( bId );
    }else{
      // Cuenta Nivel Administrador
      if( this.cuenta === "Admin" || this.cuenta === "Director" ){
        const coord:number = coordinacionSelect; // Numero de Coordinacion
        this.jve.celulasCoordinacion( cId, coord, false, false ); // Celulas de Coordinacion
        // Bautismos de la Coordinacion
        this.bautismosS.bautismosCicloCoord( bId, coord );
      }else{
        // Cuenta Nivel Coordinador
        const coord:number = this.datos.getNumero(); // Numero de Coordinacion
        this.jve.celulasCoordinacion( cId, coord, false, false );
        // Bautismos de la Coordinacion
        this.bautismosS.bautismosCicloCoord( bId, coord );
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

  public formatoBautismo(coord:number, p:number, celula:number, valor?: number ){
    const pMayor = this.periodoMayor;
    if( celula == 0 ){
      return "";
    }
    if( p <= pMayor ){
      if(valor){
        // sumar totales
        this.totalesBautismos[coord][p-1] += valor;
        //
        return valor;
      }else return "0";
    }
    return "";
  }
  public textNegritas( c?:number ){
    if( c > 0 ){
      return 'fw-bold';
    }
    return '';
  }
  public sumarTotalBautismosCoord(coord:number,valor:number){
    this.totalesBautismos[coord][10]+=valor;
    console.log(this.totalesBautismos[coord]);
  }
  public resetTotalesBautismos(coord:number){
    this.totalesBautismos[coord] = [0,0,0,0,0,0,0,0,0,0,0];
  }
  obtenerValorSeguro(i: number,posicion:number): any {
    return this.totalesBautismos[i]?.[posicion] ?? 'Valor predeterminado';
  }
}
