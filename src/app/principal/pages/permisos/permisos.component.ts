import { AfterViewInit, Component, ViewChild } from '@angular/core';
// Servicios *********
import { ConexionService } from '../../../services/conexion.service';
import { DatosService } from '../../../services/datos.service';
//***Material****************************************** */
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
// Inferface *********
import { Cuenta } from '../../interfaces/inferfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements AfterViewInit{
  //Tabla
  displayedColumns: string[] = ['position','fecha','nombre','email','cuenta','numero','permiso','btnEdit'];
  dataSource: MatTableDataSource<Cuenta>
  @ViewChild(MatSort) sort: MatSort;
  //***** */
  public pendientes: Cuenta[];
  public cuentas: Cuenta[];
  public modalCuenta: Cuenta;
  //loader
  public loader: boolean;
  //boton text
  public btnTab: string = "Todos";

  public formCuentaModal:FormGroup = this.fb.group({
    tipoCuenta: [ "pendiente", Validators.required ],
    numero: [ 0, Validators.required ],
    permiso: [ "", Validators.required ]
  });

  constructor(private conexion: ConexionService, private datos:DatosService,private fb:FormBuilder) {
    this.loader = true;
    this.datos.acceso("permisos");
  }
  ngAfterViewInit(): void {
    this.cuentasPendientes();
  }

  private cuentasPendientes(){
    this.loader = true;
    this.conexion.leerCuentasPendiente().subscribe( c =>{
      this.pendientes = c;
      // ------------ Tabla- -------------
      this.dataSource = new MatTableDataSource(this.pendientes);
      this.dataSource.sort = this.sort;
      this.loader = false;
    })
  }

  private cuentasAll(){
    this.loader = true;
    this.conexion.leerCuentasAll().subscribe( c =>{
      this.cuentas = c;
      this.dataSource = new MatTableDataSource(this.cuentas);
      this.dataSource.sort = this.sort;
      this.loader=false;
    })
  }

  public getCuentas(){
    if(this.btnTab == "Todos"){
      this.btnTab = "Pendientes";
      this.cuentasAll();
    }else{
      this.btnTab = "Todos";
      this.cuentasPendientes();
    }
  }
  // Modal
  public editarCModal(cuenta: Cuenta){
    this.modalCuenta = cuenta;
    this.formCuentaModal.reset({
      tipoCuenta: cuenta.cuenta,
      numero: cuenta.numero,
      permiso: cuenta.permiso
    })
  }
  // Modal Guardar
  public guardarModal(){
    if(this.formCuentaModal.invalid){
      return
    }else if(this.formCuentaModal.controls.tipoCuenta?.value == "pendiente") {
      return
    }
    this.loader = true;
    // Actualizar datos del formulario
    const { tipoCuenta, permiso, numero } = this.formCuentaModal.value;
    this.modalCuenta.permiso = permiso;
    this.modalCuenta.cuenta = tipoCuenta;
    this.modalCuenta.numero = numero;
    //Guardar BD
    this.conexion.editarCuenta(this.modalCuenta).then( ()=>{
      this.formCuentaModal.reset({
        tipoCuenta: "pendiente",
        numero: 0
      })
      this.loader = false;
    });
  }

}
