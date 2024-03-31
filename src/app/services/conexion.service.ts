import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cuenta, Periodo, Sobre, Celula, Nombre, Bautismo, Vercion } from '../principal/interfaces/inferfaces';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  //permiso
  private permiso: string ="Cargando...";
  private cuenta: string = "Cargando...";
  private numero: number = -1; // Celula o Coordinacion
  private queryObservable;
  //Cuentas
  private coleccionCuentas: AngularFirestoreCollection<Cuenta>;
  private cuentaDoc: AngularFirestoreDocument<Cuenta>;
  //Periodos
  private coleccionesDePeriodos: AngularFirestoreCollection<Periodo>;
  //Sobres
  private coleccionesDeSobres: AngularFirestoreCollection<Sobre>;
  private sobreDoc: AngularFirestoreDocument<Sobre>
        // query's Sobres
  private queryObservableSobresCicloAll;
  private queryObservableSobresCicloCoord;
  private queryObservableSobres5;
        // semana para Query Sobre 5
        private sInicialAnterior:number = 0;
        // Reporte debeSobre Coordinador Anterior
        private debeSobreCoordAnterior:number = 0;
        // Reporte Datos del Sobre Coordinador Anterior
        private datosSobreCoordAnterior = 0;
  //Bautismos
  private queryObservableBautismoCicloCoord;
        // Reporte Bautismos Numero de Coordinacion anterior
        private bautismoCoordAnterior:number = 0;
  //Nombres
  private coleccionesDeNombres: AngularFirestoreCollection<Nombre>;
  private nombreDoc: AngularFirestoreDocument<Nombre>;
  //Celulas
  private coleccionesDeCelulas: AngularFirestoreCollection<Celula>;
  private celulaDoc: AngularFirestoreDocument<Celula>;
  private queryObservableAllCelulas;
  private allCelulasInfo: boolean = false;
  //Vercion
  private coleccionesDeVercion: AngularFirestoreCollection<Vercion>;
  private v:Observable<Vercion[]>

  constructor(private afs:AngularFirestore) { 
    this.coleccionCuentas = afs.collection<Cuenta>('cuentas');
    //periodos
    this.coleccionesDePeriodos = afs.collection<Periodo>('periodos');
    //Vercion
    this.coleccionesDeVercion = afs.collection<Vercion>('vercion');
    this.v = this.coleccionesDeVercion.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Vercion;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    
  }
  // Vercion
  public getVercion(){
    return this.v;
  }
  
  //********************************************* */
  public getCuenta():string{
    return this.cuenta;
  }
  public getPermiso():string{
    return this.permiso;
  }
  public setPermiso(permiso: string, cuenta: string){
    this.permiso = permiso;
    this.cuenta = cuenta;
  }
  //******************************************* */
  public setNumero( numero: number ){
    this.numero = numero;
  }
  public getNumero():number{
    return this.numero;
  }
  /********************************************* */
  //***************************************** */
  fechahoy(){
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
  //********************************* */
  //***************************************************************** */
  // ***************** Cuentas
  //***************************************************************** */
  public leerCuentasAll(){
    return this.coleccionCuentas.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Cuenta;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
  //Leer Cuentas Pendientes
  leerCuentasPendiente(){
    this.queryObservable = this.afs.collection('cuentas', ref=>ref.where('permiso','==',"pendiente")).snapshotChanges().pipe(
      map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Cuenta;
          const id = a.payload.doc.id;
          return { id, ...data };
      }))
    )
    this.queryObservable.subscribe(queriedItems =>{
        return queriedItems;
    })
    return this.queryObservable;
  }
  //Leer Cuentas de una celula
  leerCuentasDeCelula( celula:number ){

    return this.afs.collection('cuentas', ref=>ref.where('numero','==',celula)).get().toPromise();

  }
  // LEER Permiso de Cuenta************************
  leerPermiso(correo: string){
    this.queryObservable = this.afs.collection('cuentas', ref=>ref.where('email','==',correo)).snapshotChanges().pipe(
        map(actions => actions.map(a =>{
            const data = a.payload.doc.data() as Cuenta;
            const id = a.payload.doc.id;
            return { id, ...data };
        }))
    )
    this.queryObservable.subscribe(queriedItems =>{
        return queriedItems;
    })
    return this.queryObservable;
  }
  //** AgreGar Cuenta */
  agregarCuenta(cuenta: Cuenta) {
    return this.coleccionCuentas.add(cuenta);
  }
  // Editar Cuenta
  editarCuenta(cuenta: Cuenta){
    this.cuentaDoc = this.afs.doc<Cuenta>(`cuentas/${cuenta.id}`);
    return this.cuentaDoc.update(cuenta);
  }
  //***************************************************************** */
  // ***************** Periodos
  //***************************************************************** */
  //Leer Periodos */
  //** AgreGar Periodo */
  public addCiclo( ciclo: Periodo) {
    return this.coleccionesDePeriodos.add(ciclo);
  }
  //Borrar Periodo */
  public eliminarPeriodo( p: Periodo){
    return this.afs.doc<Periodo>(`periodos/${p.id}`).delete();
  }

  leerPeriodos(){
    return this.coleccionesDePeriodos.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Periodo;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
  //***************************************************************** */
  // Nombres de La Estructura CELULAR (Coordinadores, SubCoordinadores)
  //***************************************************************** */
  leerNombres(id: string){
    this.coleccionesDeNombres = this.afs.collection<Nombre>(id);
    return this.coleccionesDeNombres.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Nombre;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  // Agregar Nombre
  public addNombre( nombre: Nombre, id:string ){
    this.coleccionesDeNombres = this.afs.collection<Nombre>(id);
    return this.coleccionesDeNombres.add(nombre);
  }
  // Editar Nombres
  public editarNombre( nombre: Nombre, id:string ){
    this.nombreDoc = this.afs.doc<Nombre>(`${id}/${nombre.id}`);
    return this.nombreDoc.update(nombre);
  }
  //Borrar Nombre */
  public eliminarNombre( n: Nombre, id:string){
    this.nombreDoc = this.afs.doc<Nombre>(`${id}/${n.id}`);
    return this.nombreDoc.delete();
  }

  //***************************************************************** */
  // ***************** Celulas
  //***************************************************************** */
  
  // Agregar Celula
  public addCelula( celula:Celula, id:string ){
    this.coleccionesDeCelulas = this.afs.collection<Celula>(id);
    return this.coleccionesDeCelulas.add(celula);
  }
  // Editar Celula
  public editarCelula(celula: Celula, id:string ){
    this.celulaDoc = this.afs.doc<Celula>(`${id}/${celula.id}`);
    return this.celulaDoc.update(celula);
  }
  //Borrar Celula */
  public eliminarCelula( c: Celula, id:string){
    this.celulaDoc = this.afs.doc<Celula>(`${id}/${c.id}`);
    return this.celulaDoc.delete();
  }
  // Leer 1 Celula
  public leer1Celula(id: string, celula: number){
    return this.afs.collection( id , ref => ref.where( 'Celula','==',celula ))
        .get().toPromise();  
  }
  // Leer Celulas
  public leerCelulas(id: string){
    if( !this.allCelulasInfo ){
      // Entrar una sola vez
      this.allCelulasInfo = true;
      // Peticion de base de Datos
      this.queryObservableAllCelulas = this.afs.collection<Celula>(id).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Celula;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      return this.queryObservableAllCelulas;
    }else{
      return this.queryObservableAllCelulas;
    }
  }
  // Leer Celulas de una Coordinacion
  public leerCelulasCoordinacion(id: string, coordinacion: number){
    this.queryObservable = this.afs.collection( id , ref => ref.where( 'Coordinacion','==',coordinacion ))
        .snapshotChanges().pipe(
      map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Cuenta;
          const id = a.payload.doc.id;
          return { id, ...data };
      }))
    )
    this.queryObservable.subscribe(queriedItems =>{
        return queriedItems;
    })
    return this.queryObservable;
  }
  //***************************************************************** */
  // ***************** Sobres
  //***************************************************************** */
  //Leer ALL Sobres de un CICLO
  public leerSobresCiclo( ciclo: string ){
    if( this.queryObservableSobresCicloAll ){
      return this.queryObservableSobresCicloAll;
    } 
    else{
      return this.queryObservableSobresCicloAll = this.afs.collection<Sobre>(ciclo).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Sobre;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }
  }
  
  //Leer de una COORDINACION todos los Sobres de un CICLO
  public leerSobresCoordCiclo( ciclo: string, coord:number ){
    if( this.queryObservableSobresCicloCoord && this.debeSobreCoordAnterior == coord ){
      return this.queryObservableSobresCicloCoord;
    } 
    else{
      this.debeSobreCoordAnterior = coord; // Guardar Coordinacion anterior
      const rango1:number = coord*100;
      const rango2:number = (coord*100+99);
      return this.queryObservableSobresCicloCoord = this.afs.collection<Sobre>(ciclo, ref=>ref
              .where( 'celula','>=',rango1 )
              .where( 'celula','<=',rango2 ))
          .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Sobre;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }
  }
  //Leer 5 semanas All Sobres
  public leer5Sobres(sInicial:number, ciclo: string){
    if( this.queryObservableSobres5 && sInicial == this.sInicialAnterior ){
      return this.queryObservableSobres5;
    }else{
      this.sInicialAnterior = sInicial // Semana Anterior
      const sFinal:number = sInicial;
      sInicial -=5;
      this.queryObservableSobres5 = this.afs.collection( ciclo , ref=>ref
            .where( 'semana','>',sInicial )
            .where( 'semana','<=',sFinal ))
          .snapshotChanges().pipe(
        map(actions => actions.map(a =>{
            const data = a.payload.doc.data() as Sobre;
            const id = a.payload.doc.id;
            return { id, ...data };
        }))
      )
      this.queryObservableSobres5.subscribe(queriedItems =>{
          return queriedItems;
      })
      return this.queryObservableSobres5;
    }
  }
  // Leer Sobre de 1 SEMANA celula en específico
  public leerSobresSemana(semana:number, ciclo: string){
    this.queryObservable = this.afs.collection( ciclo , ref=>ref.where( 'semana','==',semana ) )
        .snapshotChanges().pipe(
      map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Sobre;
          const id = a.payload.doc.id;
          return { id, ...data };
      }))
    )
    this.queryObservable.subscribe(queriedItems =>{
        return queriedItems;
    })
    return this.queryObservable;
  }
  //Leer Sobres */
  public leerSobre(doc: string, id: string){
    this.coleccionesDeSobres = this.afs.collection<Sobre>(id);
    return this.coleccionesDeSobres.doc(doc).get();
  }
  //Leer 1 Sobre de una Celula
  public leer1SobreCelula( ciclo: string, celula:number, semana:number ){

    /*return this.afs.firestore.collection(ciclo)
              .where('celula','==',celula)
              .where('semana','==',semana)
              .get();*/

    return this.afs.collection( ciclo , ref=> ref
              .where( 'celula','==',celula )
              .where( 'semana','==',semana )
          ).get().toPromise();
  }

  //Leer Sobres all de una Celula
  public leerSobresCelula( ciclo: string, celula:number ){
    return this.afs.collection( ciclo , ref=>ref.where( 'celula','==',celula )).get().toPromise();
  }
  //Agregar Sobres */
  public addSobre( sobre: Sobre, id: string ){
    //sobre
    return this.afs.collection<Sobre>(id).add(sobre);
  }
  //Editar Sobre
  public editarSobre(s: Sobre, id:string){
    this.sobreDoc = this.afs.doc<Sobre>(`${id}/${s.id}`);
    return this.sobreDoc.update(s);
  }
  //Borrar Sobres */
  public eliminarSobre(s: Sobre, id:string){
    this.sobreDoc = this.afs.doc<Sobre>(`${id}/${s.id}`);
    return this.sobreDoc.delete();
  }
  //***************************************************************** */
  // ***************** BAUTISMOS
  //***************************************************************** */
  //Lerr bautosmos de un CICLO
  public leerBautismoCiclo( ciclo: string ){
    return this.afs.collection<Bautismo>(ciclo).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Bautismo;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
    
  // Bautismos del ciclo de una Coordinacion
  public leerBautismoCicloCoord(ciclo: string, coord:number){
    if( this.queryObservableBautismoCicloCoord && this.bautismoCoordAnterior == coord ){
      return this.queryObservableBautismoCicloCoord;
    } 
    else{
      this.bautismoCoordAnterior = coord; // Guardar Coordinacion anterior
      let rango1:number = coord*100;
      let rango2:number = (coord*100+99);
      return this.queryObservableBautismoCicloCoord = this.afs.collection<Bautismo>(ciclo, ref=>ref
              .where( 'celula','>=',rango1 )
              .where( 'celula','<=',rango2 ))
          .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Bautismo;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }
  }
  //Lerr bautosmos de un periodo
  public leerBautismoPeriodo( ciclo: string, periodo:number ){
    this.queryObservable = this.afs.collection( ciclo , ref=>ref.where( 'periodo','==',periodo ))
        .snapshotChanges().pipe(
      map(actions => actions.map(a =>{
          const data = a.payload.doc.data() as Bautismo;
          const id = a.payload.doc.id;
          return { id, ...data };
      }))
    )
    this.queryObservable.subscribe(queriedItems =>{
        return queriedItems;
    })
    return this.queryObservable;
  }
  //Lerr bautosmos de una Celula
  public leerBautismoCelula( ciclo: string, celula:number ){
    return this.afs.collection( ciclo , ref=>ref.where( 'celula','==',celula )).get().toPromise();
  }
  //Agregar Bautismo */
  public addBautismo( b: Bautismo, id: string ){
    return this.afs.collection<Bautismo>(id).add(b);
  }
  //Editar Bautismo
  public editarBautismo( b: Bautismo, id:string ){
    return this.afs.doc<Sobre>(`${id}/${b.id}`).update(b);
  }
  //Borrar Bautismo */
  public eliminarBautismo( b: Bautismo, id:string){
    return this.afs.doc<Bautismo>(`${id}/${b.id}`).delete();
  }

}
