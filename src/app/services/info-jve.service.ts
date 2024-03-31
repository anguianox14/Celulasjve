import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { Periodo, Celula, Nombre,  } from '../principal/interfaces/inferfaces';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class InfoJveService {

  //si cambia el ID consultar la BD por la nueva informacion
  public idAnterior: string = "id";// ID Celular anterior
  public coordAnterior: number = -1;

  public ciclos: Periodo[]=[];// ALL CICLOS

  public estructura: Celula[]; // CELULAS SIN ORDENAR

  public allNombres: Nombre[]; // Todos los Nombres

  // Varialbes Globales Ordenar Celulas
  private subCoorActual: number;
  private coordActual: number;
  private ultimaSubC: boolean;
  private subCoordinacion: Celula[];

  public tablas: any[]=[]; // LISTA CELULAS ORDENADAS 
  public listCoordinadores: Nombre[]=[]; //LISTAS DE COORDINADORES
  public listSubC: Nombre[]=[]; // LISTA DE SUBCOORDINADORES
  public listSupervisor: Celula[]=[]; //LISTA DE SUPERVISORES
  //**
  constructor( private conexion: ConexionService ) {
    // Periodos
    this.conexion.leerPeriodos().subscribe( (ciclos:Periodo[]) =>{
      this.ciclos = ciclos;
    });
  }
  //***************************************** */
  public fechahoy(){
    const f = new Date();
    let m:string=""+(f.getMonth() +1);
    let d:string=""+f.getDate();
    if(f.getMonth() +1< 10){
      m = "0"+m;
    }
    if(f.getDate()<10){
      d = "0"+d;
    }
    const hoy = (f.getFullYear() + "-" + m + "-" + d);
    return hoy;
  }
  // Lista de todas las CELULAS
  public celulas( id: string, inactivas: boolean, all: boolean ){
    // Si ID anterior es Diferenter Consultar en BD
    //if( this.idAnterior !== id){
    //  this.idAnterior = id; // Asignar ID
      this.coordAnterior = -1;
      // Buscar Info de ID
      this.conexion.leerCelulas(id).subscribe( ( celulas:Celula[] ) =>{
        this.estructura = celulas;
        //Reset
        this.tablas = []; //reset
        this.subCoordinacion = []; // reset
        this.subCoorActual = -1; // -1 para asignarle el primer SubCoord
        this.coordActual = -1; // -1 para asignarle el primer Coordinador
        this.ultimaSubC = false; // reset ultima SubCoord
        this.listSupervisor = []; // reset ultima SUPERVISOR
        //
        if( celulas.length > 0 ){
          this.ordenarCelulas( celulas, inactivas, all );
        }
      })
    /*}else{
      //Reset
      this.tablas = []; //reset
      this.subCoordinacion = []; // reset
      this.subCoorActual = -1; // -1 para asignarle el primer SubCoord
      this.coordActual = -1; // -1 para asignarle el primer Coordinador
      this.ultimaSubC = false; // reset ultima SubCoord
      this.listSupervisor = []; // reset ultima SUPERVISOR
      //
      this.ordenarCelulas( this.estructura , inactivas, all );
    }*/
  }
  // Lista de una COORDINACION
  public celulasCoordinacion( id: string, coordN:number, inactivas: boolean, all: boolean ){
    // Si ID anterior es Diferenter Consultar en BD
    if( this.idAnterior !== id || coordN != this.coordAnterior ){
      this.coordAnterior = coordN; // Asignar Coordinador
      this.idAnterior = id; // Asignar ID
      // Buscar Info de ID
      this.conexion.leerCelulasCoordinacion(id,coordN).subscribe( ( celulas:Celula[] ) =>{
        this.estructura = celulas;
        //Reset
        this.tablas = []; // reset
        this.subCoordinacion = []; // reset
        this.subCoorActual = -1; // -1 para asignarle el primer SubCoord
        this.coordActual = -1; // -1 para asignarle el primer Coordinador
        this.ultimaSubC = false; // reset ultima SubCoord
        this.listSupervisor = []; // reset ultima SUPERVISOR
        //
        this.ordenarCelulas( celulas, inactivas, all );
      })
    }else{
      //Reset
      this.tablas = []; //reset
      this.subCoordinacion = []; // reset
      this.subCoorActual = -1; // -1 para asignarle el primer SubCoord
      this.coordActual = -1; // -1 para asignarle el primer Coordinador
      this.ultimaSubC = false; // reset ultima SubCoord
      this.listSupervisor = []; // reset ultima SUPERVISOR
      //
      // Si el Ciclo no cambia Solo ordenar la Informacion con los nuevos parametros
      this.ordenarCelulas( this.estructura , inactivas, all );
    }
  }
  //********************************************************************************************** */
  // ***************** Buscar Si la Celula Existe
  //********************************************************************************************** */
  public celulaExiste( celula: number ){
    const result = this.estructura?.filter( (c:Celula) => c.Celula == celula );
    if( result?.length <= 0){
      return false
    }
    return true;
  }
  //********************************************************************************************** */
  // ***************** Buscar Si la Numero de SubCoordinador esta ocupado
  //********************************************************************************************** */
  public numeroSubOcupado( numero: number, coor:number ){
    const result = this.listSubC?.filter( (c:Nombre) => (c.subCoor == numero && c.coordinacion == coor) );
    if( result?.length <= 0){
      return false
    }
    return true;
  }
  //********************************************************************************************** */
  // ***************** Buscar Si la Numero de Coordinador esta ocupado
  //********************************************************************************************** */
  public numeroCoorOcupado( numero: number ){
    const result = this.listCoordinadores?.filter( (c:Nombre) => ( c.coordinacion == numero) );
    if( result?.length <= 0){
      return false
    }
    return true;
  }
  //********************************************************************************************** */
  // ***************** Nombres de Coordinador Subcoordinador
  //********************************************************************************************** */
  
  public nombres(id: string){
    
    this.conexion.leerNombres(id).subscribe( (n:Nombre[]) =>{
      //resert
      this.listCoordinadores = [];
      this.listSubC = [];
      // Ordenar por Coordinacion
      n = n.sort(function(a, b) {
        return a.coordinacion - b.coordinacion;
      });
      //all nombres
      this.allNombres = n;
      // Coordinadores
      this.listCoordinadores = n.filter( c => c.tipo == "coordinacion" );
      // SubCoordinadores
       let sb = n.filter( c => c.tipo == "sub" );
       sb = sb.sort(function(a, b) {
        return a.subCoor - b.subCoor;
      });
       this.listSubC = sb;
      //-------------------------------------------
    });
  }
  // Nombre de COORDINADOR
  public cualNombreC( coord:number ){
    let r:string = String(coord);
    if(this.listCoordinadores){
      this.listCoordinadores.forEach( element =>{
        if(element.coordinacion == coord){
          r = element.nombre;
        }
      })
    }
    return r;
  }

  // Nombre de SUBCOORDINADOR
  public cualNombreS( coord:number, subC:number):string {
    let r:string = String(subC);
    if(this.listSubC){
      this.listSubC.forEach( element =>{
        if(element.coordinacion == coord && element.subCoor == subC){
          r = element.nombre;
        }
      })
    }
    return r;
  }

  //********************************************************************************************** */
  // ***************** ORDENAR CELULAS
  //********************************************************************************************** */
  
  private ordenarCelulas( c: Celula[], inactivas: boolean, all:boolean ){
    // Celulas Inactivas
    if( !all ){
      const estado:number = inactivas ? 0 : 1;
      c = c.filter( (obj:Celula) =>{
        if ('estado' in obj && obj.estado == estado && !isNaN(obj.estado)) {
          return true;
        } else {
          return false;
        }
      });
    }
    // Ordernar por numero de Celula
    c.sort(function(a, b) {
      return a.Celula - b.Celula;
    });
    // Ordernar por supervisor
    c.sort(function(a, b) {
      return a.Supervisor - b.Supervisor;
    });
    // Ordernar por numero de SubCoordinador
    c.sort(function(a, b) {
      return a.SubCoor - b.SubCoor;
    });
    // Ordernar por numero de Coordinacion
    c.sort(function(a, b) {
      return a.Coordinacion - b.Coordinacion;
    });
    //*******************************************************
    //* ORDENAR CELULAS PRIMERO CELULAS SUPERVISOR
    let listaDelSupervisor: Celula[] =[]; // Lista de Celulas por Supervisor
    let supervActual: number =c[0].Supervisor; // Asignar Primer Supervisor
    let subCoorActual = c[0].SubCoor;// Asignar Primer SubCoor
    let coordActual = c[0].Coordinacion;// Asignar Primer SubCoordinador
    this.subCoorActual = c[0].SubCoor;// Asignar Primer SubCoor
    this.coordActual = c[0].Coordinacion;// Asignar Primer SubCoordinador
    let contLS: number = 0; 
    for(let i=0;i<c.length;i++){
      if( c[i].Supervisor != supervActual || subCoorActual != c[i].SubCoor || coordActual != c[i].Coordinacion){
        //**
        this.ArmarListaG(listaDelSupervisor);
        // vaciamos Array reset contador
        listaDelSupervisor = []; 
        contLS=0;
        //**
        // 
        supervActual=c[i].Supervisor;
        coordActual = c[i].Coordinacion;
        subCoorActual = c[i].SubCoor;
        //
        listaDelSupervisor[contLS]=c[i];
        contLS++;
      }else{
        listaDelSupervisor[contLS]=c[i];
        contLS++;
      }
      if(i == c.length-1){
        this.ultimaSubC = true;
        this.ArmarListaG(listaDelSupervisor);
      }
    }

  }
  //*********************************************** */
  private ArmarListaG(listS: Celula[]){
    // Si la SubCoordinacion o Coordinacion Cambian, Guardar como tabla
    if( this.subCoorActual != listS[0].SubCoor || this.coordActual != listS[0].Coordinacion ){
      this.tablas.push( this.subCoordinacion );
      this.subCoordinacion = []; // reset
      this.subCoorActual = listS[0].SubCoor; //Nuevo SubCoordinador
      this.coordActual = listS[0].Coordinacion; //Nuevo Coordinador
    }

    let positionS: number = -10;
    //Recorrer los lideres
    for(let i=0;i<listS.length;i++){
      
      if(listS[i].Supervisor==listS[i].Celula){//si la celula del supervisor = lider guardar de primero
        
        let supervisor:Celula ={
          Coordinacion : listS[i].Coordinacion,
          Celula : 0,
          Lider : listS[i].Lider,
          SubCoor : listS[i].SubCoor,
          Supervisor : listS[i].Supervisor,
          estado : 1,
          fechaSobre : "",
        }
        this.subCoordinacion.push(supervisor);//add Supervisor
        this.listSupervisor.push(supervisor);//add ala lista Gloval de Todos Supervisor
        this.subCoordinacion.push(listS[i]);//add como Lider
        positionS = i;//Guardar posicion para no repetir
        break;
      } 
    }
    //si no tienen SuperVisor
    if( positionS < 0 ){
      let supervisor:Celula ={
        Coordinacion : listS[0].Coordinacion,
        Celula : 0,
        Lider : listS[0]?.nombreSupervisor,
        nombreSupervisor: listS[0]?.nombreSupervisor,
        SubCoor : listS[0].SubCoor,
        Supervisor : 0,
        estado : 0,
        fechaSobre : "",
      }
      this.subCoordinacion.push(supervisor);//add como SuperVisor
      this.listSupervisor.push(supervisor);//add ala lista Gloval de Todos Supervisor
    }
    //Recorrer los lideres de un solo supervisor
    for(let i=0;i<listS.length;i++){
  
      if(i!=positionS){//esta posicion ya esta guardada la omitimos
  
        this.subCoordinacion.push(listS[i]);//add
      } 
    }
    // Ultima SubCoordinacion
    if(this.ultimaSubC){
      this.tablas.push( this.subCoordinacion );
      this.subCoordinacion = []; // reset
      this.subCoorActual = listS[0].SubCoor; //Nuevo SubCoordinador
      this.coordActual = listS[0].Coordinacion; //Nuevo Coordinadors
    }
  }
}
