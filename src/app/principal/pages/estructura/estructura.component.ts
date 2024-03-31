import { Component, OnInit } from '@angular/core';

import { InfoJveService } from '../../../services/info-jve.service';
import { Celula, Nombre, Bautismo, Sobre, Cuenta } from '../../interfaces/inferfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConexionService } from '../../../services/conexion.service';
import { DatosService } from '../../../services/datos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estructura',
  templateUrl: './estructura.component.html',
  styleUrls: ['./estructura.component.css']
})
export class EstructuraComponent implements OnInit {

  public mostrarTabla: boolean = false;
  public mostrarNombreSupervisor: boolean = false;

  public celulaEdit: Celula;
  private ciclo: string;
  private cargoC: Nombre; // SubCoordinador o Coordinador a editar
  private listaAEditar: Nombre[];

  public selectSubCoord: Nombre[];
  public selectSupervisor: Celula[];
  public selectLider: Celula[];

  public addClick: boolean = false; // Click en boton Agregar
  public addClass: boolean = false; // Click en boton Animacion
  public btnSuccess: boolean = false; // Mostrar Boton Guardar

  public ocultarSelectSuperv: boolean = true; // Ocultar/mostrar Select Supervisor en modal Celula

  public load: boolean = false;
  // Celulas Desordenadas
  get allCelulas(){
    return this.jve.estructura;
  }
  // Celulas Ordenadas
  get tablas(){
    this.load = false;
    return this.jve.tablas;
  }
  // Todos los Coordinadores
  get listCoord(){
    return this.jve.listCoordinadores;
  }
  // Todos los SubCoordinadores
  get listSubCoord(){
    return this.jve.listSubC;
  }
  // Todos los Supervisores
  get listSupervisores(){
    return this.jve.listSupervisor;
  }
  // Todos Subs + Coords
  get listAll(){
    return this.jve.allNombres;
  }
  //Formulario ModalEditCelula
  public formCelulaEdit: FormGroup = this.fb.group({
    esSupervisor: [ 0 , Validators.required ],
    celula: [ 0,Validators.required ],
    stado: [ 0, Validators.required ],
    fechaN: [ "", Validators.required ],
    lider: [ "", Validators.required ],
    coor: [ 0,Validators.required ],
    subC: [ 0,Validators.required ],
    supervisor: [ 0,Validators.required ],
  });
  //Formulario ModalEditSupervisor
  public formSupervisorEdit: FormGroup = this.fb.group({
    coor: [ 0,Validators.required ],
    subC: [ 0,Validators.required ],
    supervisor: [ 0,Validators.required ],
    nombreSupervisor: [""],
  });
  //Formulario ModalEditSubCoordinador
  public formSubCoordEdit: FormGroup = this.fb.group({
    numero: [ 0, Validators.required],
    nombre: [ "", Validators.required],
    coor: [ 0,Validators.required ],
  });
  //Formulario ModalEditCoordinador
  public formCoordinadordEdit: FormGroup = this.fb.group({
    numero: [ 0, Validators.required],
    nombre: [ "", Validators.required],
  });

  constructor( private jve: InfoJveService,
                private datos: DatosService,
                private router: Router,
                private fb: FormBuilder,
                private conexion: ConexionService,
                ) { }

  ngOnInit(): void {
    this.permiso();
  }
  // Si Cuenta no tiene acceso Enviar a Home
  private permiso(){
    let cuenta = this.datos.getCuenta();
    let acceso = this.datos.getPermiso();
    if(cuenta !== "Admin" || acceso === "acceso denegado"){
      this.router.navigate(['home/inicio']); // Sin acceso enviar al Home
    }
  }

  

  public obtenerCiclo( ciclo:any ){
    this.mostrarTabla = true;
    this.load = true;
    this.ciclo = ciclo.ciclo;
    // Nombres
    const idN: string = "N-" + ciclo.ciclo;
    this.jve.nombres(idN);
    // Celulas
    const idC: string = "C-" + ciclo.ciclo;
    this.jve.celulas( idC, true, true );
  }

  public nombreSubC(c:number,s:number){
    return this.jve.cualNombreS(c,s);
  }

  public nombreCoord(c:number){
    return this.jve.cualNombreC(c);
  }
  //************************************************************************************************************ */
  //****** MOSTRAR OPCIONES DE AGREGAR */
  //************************************************************************************************************ */
  public mostrarAddBtns(){
    this.addClass = !this.addClass;
    if(this.addClick){
      setTimeout(() => {
        this.addClick = !this.addClick;
      }, 1000);
    }else{
      this.addClick = !this.addClick;
    }
  }
  
  //************************************************************************************************************ */
  //****** BORRAR CELULA BD */
  //************************************************************************************************************ */
  public borrarCelula(){
    // 
    //**** Borrar Bautismos de Celula */
    //ID
    const idB = "B-"+this.ciclo;
    // BAUTISMOS DE LA CELULA DURANTE EL CICLO
    let bautismos: Bautismo[] = [];
    // BD
    this.conexion.leerBautismoCelula( idB, this.celulaEdit.Celula ).then( res =>{
        const document = res.docs;
        document.forEach( object =>{
          const obj:any = object.data();
          const b:Bautismo = {
            nombre : obj.nombre,        // *
            fechaB:  obj.fechaB,
            periodo:  obj.periodo,       // *
            sexo:  obj.sexo,
            domicilio:  obj.domicilio,
            codigoPostal:  obj.codigoPostal,
            telefonoC:  obj.telefonoC,
            telefono:  obj.telefono,
            correo:  obj.correo,
            fechaNacimiento:  obj.fechaNacimiento,
            profesion:  obj.profesion,
            celula:  obj.celula,         // *
            padreEspiritual:  obj.padreEspiritual,
            telefonoPE:  obj.telefonoPE,
            id:  object.id,
          }
          bautismos.push(b);
        })
        this.borrarBautismoCelula( bautismos ,this.celulaEdit.Celula ,idB);// Borrar Bautismos
    });
    //**** SOBRES */ 
    // ID
    const idS = "S-"+this.ciclo;
    // SObres de la CElula Durante el ciclo
    let sobres: Sobre[] = [];
    // BD
    this.conexion.leerSobresCelula( idS, this.celulaEdit.Celula ).then( res =>{
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
      this.borrarSobresCelula( sobres ,this.celulaEdit.Celula ,idS); // Borrar Sobres
    });
    // ID Ciclo de Celulas
    const id = "C-"+this.ciclo;
    // Borrar Celula
    this.conexion.eliminarCelula( this.celulaEdit, id ).then( ()=>{
      this.datos.openSnackBar("Celula BORRADA","Exitosamente");
    }).catch( err =>{
      console.log(err);
      this.datos.openSnackBar(err,"Error");
    })
  }
  // Borrar Bautismos
  private borrarBautismoCelula( b:Bautismo[], c:number, id:string ){
    b.forEach(bautismo => {
      bautismo.celula = c;
      this.conexion.eliminarBautismo( bautismo,id ).then( ()=>{
        this.datos.openSnackBar("Bautosmo ELIMINACION","Exitoso");
      }).catch( er => {
        console.log( er );
        this.datos.openSnackBar(er,"ERROR");
      })
    });
  }
  // Borrar Sobres
  private borrarSobresCelula( s:Sobre[], c:number, id:string ){
    s.forEach( sobre => {
      sobre.celula = c;
      this.conexion.eliminarSobre( sobre,id ).then( ()=>{
        this.datos.openSnackBar("Sobre ELIMINACION","Exitoso");
      }).catch( er => {
        console.log( er );
        this.datos.openSnackBar(er,"ERROR");
      })
    });
  }
  //************************************************************************************************************ */
  //****** EDITAR CELULA BD */
  //************************************************************************************************************ */
  public editarCelula( celula:Celula, id:string ){
    this.conexion.editarCelula( celula, id ).then( ()=>{
      this.datos.openSnackBar("Celula Edita","Exitosamente");
    }).catch( err =>{
      console.log(err);
      this.datos.openSnackBar("Celula Edit","Error");
    })
  }
  //************************************************************************************************************ */
  //****** EDITAR NOMBRE BD */
  //************************************************************************************************************ */
  public editarNombre( nombre:Nombre, id:string ){
    this.conexion.editarNombre( nombre ,id ).then( () =>{
      this.datos.openSnackBar("Editar","Exitoso");
    }).catch( err =>{
      this.datos.openSnackBar("Editar","Error");
      console.log(err);
    })
  }
  //************************************************************************************************************ */
  //****** BORRAR NOMBRE BD */
  //************************************************************************************************************ */
  public borrarNombre(nombre:Nombre){
    this.load = true;
    // ID Ciclo de Celulas
    const id = "N-"+this.ciclo;
    this.conexion.eliminarNombre( nombre ,id ).then( () =>{
      this.datos.openSnackBar("BORRADO","Exitoso");
      this.selectCoordChange(-1);
      this.load = false;
    }).catch( err =>{
      this.load = false;
      this.datos.openSnackBar(err,"Error");
      console.log(err);
    })
  }
  //************************************************************************************************************ */
  //****** FORMULARIO EDITAR CELULA */
  //************************************************************************************************************ */
  // Mostrar Formulario Agregar Celula
  public newCelulaDatos(){
    this.ocultarSelectSuperv = true; // Mostrar Select Supervisor
    //Mostrar Boton Guardar
    this.btnSuccess = true;
    // rellenar el mormulario del modal con la info
    const f = this.conexion.fechahoy();
    window.setTimeout( ()=>{
      this.formCelulaEdit.reset({
        esSupervisor: 0,
        stado: 1,
        fechaN: f,
      })
    } , 250);
  }
  // Ocultar o mostrar Select Supervisor
  public esSupervisor(){
    const { esSupervisor } = this.formCelulaEdit.value;
    if( esSupervisor == 0 ){
      this.ocultarSelectSuperv = true; // Mostrar
    }else {
      this.ocultarSelectSuperv = false; // Ocultar
    }
  }

  // Mostrar Formulario EDITAR Celula
  public celulaDatos( c:Celula ){
    this.ocultarSelectSuperv = true; // Mostrar Select Supervisor
    // NO Mostrar Boton Guardar
    this.btnSuccess = false;
    // celula seleccionada
    this.celulaEdit = c;
    //Llenar los Select del Modal Edit
    this.selectSubCoord = [];
    this.selectSupervisor = [];
    this.selectSubCoord = this.listSubCoord.filter( sb => sb.coordinacion == c.Coordinacion );
    this.selectSupervisor = this.listSupervisores.filter( s => (s.Coordinacion == c.Coordinacion && s.SubCoor == c.SubCoor ) );
    // fecha de Celula
    const f:Date = new Date(c.fechaSobre);
    let m: string = String(f.getMonth()+1);
    let d: string = String(f.getDate());
    if(f.getMonth()+1< 10){
      m = "0"+m;
    }
    if(f.getDate()<10){
      d = "0"+d;
    }
    const fecha: string = f.getFullYear()+"-"+m+"-"+d;
    // rellenar el mormulario del modal con la info
    window.setTimeout( ()=>{
      this.formCelulaEdit.reset({
        esSupervisor: 0,
        celula: c.Celula,
        stado: c.estado,
        fechaN: fecha,
        lider: c.Lider,
        coor: c.Coordinacion,
        subC: c.SubCoor,
        supervisor: c.Supervisor,
      })
    } , 250);
  }

  // se cambia el Select Coordinador cambiar Select SubCoordinador
  public selectCoordChange(coor){
    //reset
    this.selectSubCoord=[];
    // Cambiar select SubCoordinador
    this.selectSubCoord = this.listSubCoord.filter( sb => sb.coordinacion == coor );
    // Asignar el Valor de SubCoordinador al primero
    this.formCelulaEdit.controls.subC.setValue(this.selectSubCoord[0]?.subCoor);
    this.formSupervisorEdit.controls.subC.setValue(this.selectSubCoord[0]?.subCoor);
    // Asignar el Valor de Supervisor
    window.setTimeout( ()=>{
      this.selectSubCChange();
    },200);
  }
  // se cambia el Select SubCoordinador cambiar Select supervisor
  public selectSubCChange(){
    // dato del formulario Modal
    const { coor, subC } = this.formCelulaEdit.value;
    //reset
    this.selectSupervisor = [];
    // Cambiar select Supervisor
    this.selectSupervisor = this.listSupervisores.filter( s => (s.Coordinacion == coor && s.SubCoor == subC ) );
    // Asignar el Valor de Supervisor al primero
    console.log( this.selectSupervisor );
    this.formCelulaEdit.controls.supervisor.setValue( this.selectSupervisor[0]?.Supervisor );
  }
  
  //************* SUBMIT FORMULARIO EDIT CELULA ********************************** */

  public datosEditCelula(){
    //Celula como Supervisor o no
    const { esSupervisor, celula } = this.formCelulaEdit.value;
    if( esSupervisor == 1 ){
      this.formCelulaEdit.controls.supervisor.setValue(celula);
    }
    // Formulario Invalid
    if( this.formCelulaEdit.invalid ){
      this.formCelulaEdit.markAllAsTouched();
      this.datos.openSnackBar("Editar","Error");
      return;
    }
    // ID Ciclo de Celulas
    const id = "C-"+this.ciclo;
    // Datos de la CELULA
    const { stado, fechaN, lider, coor, subC, supervisor } = this.formCelulaEdit.value;
    // ADD CELULA NUEVA
    if( this.btnSuccess ){
      //reset id celula
      const c: Celula = {
        Celula : Number(celula),
        estado : Number(stado),
        fechaSobre : fechaN,
        Lider : lider,
        Coordinacion : Number(coor),
        SubCoor : Number(subC),
        Supervisor : Number(supervisor),
      }
      this.conexion.addCelula( c, id ).then( ()=>{
        this.datos.openSnackBar("Celula Agregada","Exitosamente");
      }).catch( er=>{
        console.log(er);
        this.datos.openSnackBar("Celula","Error");
      });
    }else{ // EDIT CELULA 
      const celulaAnterior = this.celulaEdit.Celula;
      this.celulaEdit.Celula = Number(celula);
      this.celulaEdit.estado = Number(stado);
      this.celulaEdit.fechaSobre = fechaN;
      this.celulaEdit.Lider = lider;
      this.celulaEdit.Coordinacion = Number(coor);
      this.celulaEdit.SubCoor = Number(subC);
      this.celulaEdit.Supervisor = Number(supervisor);
      // MODIFICAR EN BD
      this.editarCelula( this.celulaEdit, id );
      // Si se Modifico el Numero de Celula Modificar Sobres y Bautismos
      if( celulaAnterior != celula ){
        //**** BAUTISMOS */
        //ID
        const idB = "B-"+this.ciclo;
        // BAUTISMOS DE LA CELULA DURANTE EL CICLO
        let bautismos: Bautismo[] = [];
        // BD
        this.conexion.leerBautismoCelula( idB, celulaAnterior ).then( res =>{
            const document = res.docs;
            document.forEach( object =>{
              const obj:any = object.data();
              const b:Bautismo = {
                nombre : obj.nombre,        // *
                fechaB:  obj.fechaB,
                periodo:  obj.periodo,       // *
                sexo:  obj.sexo,
                domicilio:  obj.domicilio,
                codigoPostal:  obj.codigoPostal,
                telefonoC:  obj.telefonoC,
                telefono:  obj.telefono,
                correo:  obj.correo,
                fechaNacimiento:  obj.fechaNacimiento,
                profesion:  obj.profesion,
                celula:  obj.celula,         // *
                padreEspiritual:  obj.padreEspiritual,
                telefonoPE:  obj.telefonoPE,
                id:  object.id,
              }
              bautismos.push(b);
            })
            this.modificarBautismoCelula( bautismos ,celula,idB);
        });
        //**** SOBRES */ 
        // ID
        const idS = "S-"+this.ciclo;
        // SObres de la CElula Durante el ciclo
        let sobres: Sobre[] = [];
        // BD
        this.conexion.leerSobresCelula( idS, celulaAnterior ).then( res =>{
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
          this.modificarSobresCelula( sobres ,celula,idS);
        });
        //****  CUENTAS */
        // BAUTISMOS DE LA CELULA DURANTE EL CICLO
        let cuentas: Cuenta[] = [];
        // BD
        this.conexion.leerCuentasDeCelula( celulaAnterior ).then( res =>{
            const document = res.docs;
            document.forEach( object =>{
              const obj:any = object.data();
              const b:Cuenta = {
                nombre : obj.nombre,        // *
                createFecha: obj.createFecha,
                cuenta: obj.cuenta,
                numero: obj.numero,
                telefono: obj.telefono,
                email: obj.email,
                permiso: obj.permiso,
                id:  object.id,
              }
              cuentas.push(b);
            })
            this.modificarCuentas( cuentas ,celula);
        });
      }
    }
  }
  // MODIFICAR BAUTISMOS
  private modificarBautismoCelula( b:Bautismo[], c:number, id:string ){
    b.forEach(bautismo => {
      bautismo.celula = c;
      this.conexion.editarBautismo( bautismo,id ).then( ()=>{
        this.datos.openSnackBar("Bautosmo De Celula","Edit");
      }).catch( er => {
        console.log( er );
        this.datos.openSnackBar(er,"ERROR");
      })
    });
  }
  // MODIFICAR SOBRES
  private modificarSobresCelula( s:Sobre[], c:number, id:string ){
    s.forEach( sobre => {
      sobre.celula = c;
      this.conexion.editarSobre( sobre,id ).then( ()=>{
        this.datos.openSnackBar("Sobre De Celula","Edit");
      }).catch( er => {
        console.log( er );
        this.datos.openSnackBar(er,"ERROR");
      })
    });
  }
  // MODIFICAR CUENTAS
  private modificarCuentas( c:Cuenta[], celula:number ){
    c.forEach( cuenta => {
      if( cuenta.cuenta == "Celula" ){
        cuenta.numero = celula;
        this.conexion.editarCuenta( cuenta ).then( ()=>{
          this.datos.openSnackBar("Cuenta De Celula","Edit");
        }).catch( er => {
          console.log( er );
          this.datos.openSnackBar(er,"ERROR");
        })
      }
    });
  }

  //************ Validar NUMERO DE CELULA ***************************************************************
  
  public numeroCelulaValido(){
    const { celula } = this.formCelulaEdit.value;
    return this.jve.celulaExiste( celula ) && this.formCelulaEdit.controls.celula.touched;
  }
  //************************************************************************************************************ */
  //****** FORMULARIO EDITAR SUPERVISOR */
  //************************************************************************************************************ */
  // Mostrar Formulario EDIT Supervisor
  public supervisorDatos( c:Celula ){
    // formulario editar
    this.btnSuccess = false;
    // celula seleccionada
    this.celulaEdit = c;
    //Llenar los Select del Modal Edit
    this.selectSubCoord = this.listSubCoord.filter( sb => sb.coordinacion == c.Coordinacion );
    this.selectLider = this.allCelulas.filter( s => 
      ( s.Coordinacion == c.Coordinacion && s.SubCoor == c.SubCoor && s.Supervisor == c.Supervisor ) 
    );
    // rellenar el mormulario del modal con la info
    window.setTimeout( ()=>{
      this.formSupervisorEdit.reset({
        coor: c.Coordinacion,
        subC: c.SubCoor,
        supervisor: c.Supervisor,
        nombreSupervisor: c.nombreSupervisor,
      });
      // Revisar si supervisor = s/n
      this.selectCambioSupervisor();
    } , 250);
  }
  // Cambio de Supervisor
  public selectCambioSupervisor(){
    const { supervisor } = this.formSupervisorEdit.value;
    if( Number( supervisor ) == 0 ){
      this.mostrarNombreSupervisor = true;
      
    }else this.mostrarNombreSupervisor = false;

  }

  // Mostrar Formulario Agregar Supervisor
  public newSupervisorDatos(){
    // formulario editar
    this.btnSuccess = true;
    // rellenar el mormulario del modal con la info
    window.setTimeout( ()=>{
      this.formSupervisorEdit.reset({
        coor: this.listCoord[0].coordinacion,
      })
      try{
        this.selectCoordChange( this.listCoord[0].coordinacion );
      }catch(er){
        console.log(er);
      }
    } , 250);
  }
  //************* SUBMIT FORMULARIO EDIT Supervicion ********************************** */
  public datosEditSupervisor(){
    if( this.formSupervisorEdit.invalid ){
      this.formSupervisorEdit.markAllAsTouched();
      this.datos.openSnackBar("Editar","Error");
      return;
    }
    // ID Ciclo de Celulas
    const id = "C-"+this.ciclo;
    // Datos de la Supervisor
    const { coor, subC, supervisor, nombreSupervisor } = this.formSupervisorEdit.value;
    /*la variable selectSupervisor tiele la lista de todas las celulas del supervisor
    .-Modificar cada una con la nueva estructura*/
    if( this.btnSuccess ){
      // datos de la selula seleccionada
      const celulas = this.selectSupervisor.filter( c => c.Celula == supervisor );
      let newSupervisor:Celula = celulas[0];
      // modificar el cargo
      newSupervisor.Supervisor = newSupervisor.Celula;
      // MODIFICAR celula en BD
      this.editarCelula( newSupervisor, id );
    }else{
      this.selectLider.forEach( (c:Celula) =>{
        c.Coordinacion = Number(coor);
        c.SubCoor = Number(subC);
        c.Supervisor = Number(supervisor);
        c.nombreSupervisor = nombreSupervisor;
        // MODIFICAR cada celula en BD
        this.editarCelula( c, id );
      });
    }
    
  }
  //************************************************************************************************************ */
  //****** FORMULARIO EDITAR SUBCOORDINADOR */
  //************************************************************************************************************ */
  // Mostrar Formulario Nuevo SubCoordinador
  public newsubCoordinadorDatos(){
    // formulario New
    this.btnSuccess = true;
    // rellenar el formulario del modal con la info
    window.setTimeout( ()=>{
      this.formSubCoordEdit.reset({
        numero: 0,
        nombre: "",
        coor: this.listCoord[0].coordinacion,
      })
    } , 250);
  }
  // Mostrar Formulario Edit SubCoordinador
  public subCoordinadorDatos( coor:number, subC:number ){
    // formulario New
    this.btnSuccess = false;
    // SubCoordinador a Editar
    const subCs = this.listSubCoord.filter( sb => (sb.coordinacion == coor && sb.subCoor == subC ) );
    // Comprobar
    if(subCs.length > 1){
      this.datos.openSnackBar("SubCoordinador Duplicado","Error");
    }else if(subCs.length == 0){
      this.datos.openSnackBar("SubCoordinador","Error");
    }
    //
    this.cargoC = subCs[0];
    // Buscar Todas las CELULAS del SUBCOORDINADOR
    this.selectSupervisor = this.allCelulas.filter( s => 
      ( s.Coordinacion == coor && s.SubCoor == subC ) 
    );
    //Nombre de subcoordinador
    let nombre = this.nombreSubC(coor,subC);
    
    // rellenar el formulario del modal con la info
    window.setTimeout( ()=>{
      this.formSubCoordEdit.reset({
        numero: subC,
        nombre: nombre,
        coor: coor,
      })
    } , 250);
  }
  //************* SUBMIT FORMULARIO SUBCOORDINADOR ********************************** 
  public datosEditSubCoor(){
    if( this.formSubCoordEdit.invalid ){
      this.formSubCoordEdit.markAllAsTouched();
      this.datos.openSnackBar("Editar","Error");
      return;
    }
    // ID Ciclo de Celulas
    const id = "C-"+this.ciclo;
    // Datos de la SubCoordinadion
    const { numero, nombre, coor } = this.formSubCoordEdit.value;
    // ID de Nombres
    const idN = "N-"+this.ciclo;
    // Nuevo true O Editar false
    if( this.btnSuccess ){
      // nuevo
      const newSubCoor: Nombre = {
        tipo : "sub",
        coordinacion : Number(coor),
        subCoor : Number(numero),
        nombre : nombre,
      }
      // Guardar en BD
      this.conexion.addNombre( newSubCoor, idN ).then( ()=>{
        this.datos.openSnackBar("SubCoordinadion Guardado","Exitoso");
      }).catch(er=>{
        this.datos.openSnackBar(er,"Error");
        console.log(er);
      })
    }else{
      /*la variable selectSupervisor es la lista de todas las celulas del SubCoordinador
      .-Modificar cada una con la nueva estructura*/
      this.selectSupervisor.forEach( (c:Celula) =>{
        //Si Cambia la Coordinacion
        if( c.Coordinacion != coor || c.SubCoor != numero ){
          c.Coordinacion = Number(coor);
          c.SubCoor = Number(numero);
          // MODIFICAR cada celula en BD
          this.editarCelula( c, id );
        }
      });
      // SubCoordinador a Editar
      this.cargoC.coordinacion = Number(coor);
      this.cargoC.subCoor = Number(numero);
      this.cargoC.nombre = nombre;
      //Editar
      this.editarNombre(this.cargoC,idN);
    }
      
  }
  //************ Validar NUMERO DE SubCoordinador ***************************************************************
  public numeroScValido(){
    const { numero, coor } = this.formSubCoordEdit.value;
    if( this.cargoC?.coordinacion != coor || this.cargoC?.subCoor != numero ){
      if(this.jve.numeroSubOcupado( numero, coor ) ){
        this.formSubCoordEdit.setErrors({
          numero: "numero duplicado",
        });
        return true;
      }
    }
    return false;
  }
  //************************************************************************************************************ */
  //****** FORMULARIO EDITAR COORDINADOR */
  //************************************************************************************************************ */
  // Formulario New
  public newCoordinadorDatos(){
    // formulario New
    this.btnSuccess = true;
    // rellenar el formulario del modal con la info
    window.setTimeout( ()=>{
      this.formCoordinadordEdit.reset();
    } , 250);
  }
  // Formulario Edit
  public coordinadorDatos( coor:number ){
    // formulario New
    this.btnSuccess = false;
    // Coordinador a Editar
    this.listaAEditar = this.listAll.filter( sb => (sb.coordinacion == coor ) );
    const cs = this.listCoord.filter( sb => (sb.coordinacion == coor ) );
    this.cargoC = cs[0];
    // Buscar Todas las CELULAS del COORDINADOR
    this.selectSupervisor = this.allCelulas.filter( s => 
      ( s.Coordinacion == coor ) 
    );
    //Nombre de coordinador
    let nombre = this.nombreCoord(coor);
    
    // rellenar el formulario del modal con la info
    window.setTimeout( ()=>{
      this.formCoordinadordEdit.reset({
        numero: coor,
        nombre: nombre,
      })
    } , 250);
  }
  //************* SUBMIT FORMULARIO COORDINADOR ********************************** */
  public datosEditCoor(){
    if( this.formCoordinadordEdit.invalid ){
      this.formCoordinadordEdit.markAllAsTouched();
      this.datos.openSnackBar("Editar","Error");
      return;
    }
    // ID Ciclo de Celulas
    const id = "C-"+this.ciclo;
    // ID Nombres
    const idN = "N-"+this.ciclo;
    // Datos del formulario
    const { numero, nombre } = this.formCoordinadordEdit.value;
    // Nueva Coordinacion True , Editar False
    if( this.btnSuccess ){
      // nuevo
      const newCoor: Nombre = {
        tipo : "coordinacion",
        coordinacion : numero,
        nombre : nombre,
      }
      // Guardar en BD
      this.conexion.addNombre( newCoor, idN ).then( ()=>{
        this.datos.openSnackBar("Coordinadion Guardado","Exitoso");
      }).catch(er=>{
        this.datos.openSnackBar(er,"Error");
        console.log(er);
      })
    }else{
        /*la variable selectSupervisor es la lista de todas las celulas del Coordinador
      .-Modificar cada una con la nueva estructura*/
      this.selectSupervisor.forEach( (c:Celula) =>{
        //Si Cambia la Coordinacion
        if( c.Coordinacion != numero ){
          c.Coordinacion = numero;
          // MODIFICAR cada celula en BD
          this.editarCelula( c, id );
        }
      });
      
      // SubCoordinador a Editar
      this.listaAEditar.forEach( n =>{
        if(n.coordinacion != numero){
          n.coordinacion = numero;
          // Editar BD
          this.editarNombre(n,idN);
        }
        if( n.tipo === "coordinacion" ){
          n.coordinacion = numero;
          n.nombre = nombre;
          // Editar BD
          this.editarNombre(n,idN);
        }
      });
    }
  }
  //************ Validar NUMERO DE COORDINADOR ***************************************************************
  public numeroCoorValido(){
    const { numero } = this.formCoordinadordEdit.value;
    if( this.cargoC?.coordinacion != numero ){
      if(this.jve.numeroCoorOcupado( numero ) ){
        this.formCoordinadordEdit.setErrors({
          numero: "numero duplicado",
        });
        return true;
      }
    }
    return false;
  }
}

