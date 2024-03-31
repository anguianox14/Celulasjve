import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cuenta, Periodo } from '../principal/interfaces/inferfaces';
import { ConexionService } from './conexion.service';


@Injectable({
  providedIn: 'root'
})
export class DatosService {
  // Cuenta
  public cuenta: string ="Cargando...";
  private permiso: string ="Cargando...";
  private numero: number = -1; // Celula o Coordinacion
  //
  private datos;

  constructor(private conexion: ConexionService,private router: Router, private _snackBar: MatSnackBar) {
    this.informacionBD();
  }
  private informacionBD(){
    if(this.cuenta=="Cargando..."){
      const email = localStorage.getItem("email");//Email en memoria
      this.datos = this.conexion.leerPermiso(email).subscribe( ( cuentas:Cuenta[] ) =>{
        if( cuentas.length > 0 ){
          this.cuenta = cuentas[0].cuenta;
          this.permiso = cuentas[0].permiso;
          this.numero = cuentas[0].numero;
        }else{
          this.cuenta = "sin asignar";
          this.permiso = "Sin permisos";
          this.numero = -1;
        }
      })
    }
  }

  public getCuenta(){
    return this.cuenta;
  }
  public getPermiso(){
    return this.permiso;
  }
  public getNumero(){
    return this.numero;
  }

  public reset(){
    this.datos.unsubscribe();
    this.cuenta ="Cargando...";
    this.permiso ="Cargando...";
    this.numero =-1;
  }

  public acceso(page: string){
    if(this.permiso === "acceso denegado" || this.permiso === "sin asignar"){
      this.router.navigate(['home/inicio']); // Sin acceso enviar al Home
    }else{
      if( page == "permisos" && this.cuenta !== "Admin" ){
        this.router.navigate(['home/inicio']); // Sin acceso enviar al Home
      }
    }
    
  }

  public calcularSemana(periodo: Periodo){
    let fechaI = new Date(periodo.fechaInicial);
    let fechaF = new Date(periodo.fechaFinal);
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
    const hoyF = new Date(); // fecha Actual
    let semana = 0;
    while( fechaI <= hoyF && fechaI <= fechaF ){
      semana++;
      fechaI.setDate(fechaI.getDate() + 7 );
    }
    //Semana Global
    return  semana;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }



  

}
