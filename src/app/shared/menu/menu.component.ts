import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Cuenta } from 'src/app/principal/interfaces/inferfaces';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public user$: Observable<any> = this.authS.user();
  //permiso
  public acceso:string = "Cargando...";
  public tipo: string = "Cargando...";

  public sobre: boolean;
  public permiso: boolean;
  public reportes: boolean;
  public config: boolean;
  public sobreAdmin: boolean;

  constructor(private authS: AuthService, private router:Router, private datos:DatosService ) {
    
    this.acceso = "Cargando...";
    this.tipo = "Cargando...";

    this.user$.subscribe( u => {
      if(u){
        localStorage.setItem("email",u.email);//Guardar Correo
        this.obtenerDatos();
      }
    });
  }

  ngOnInit(): void {
    
  }

  private obtenerDatos(){
    try {
      this.acceso = this.datos.getPermiso();
      this.tipo = this.datos.getCuenta();
      if(this.acceso === "Cargando..."){
        setTimeout( ()=>{
            this.obtenerDatos();
        } , 500 );
      }else {
        this.NivelAccesoSobre();
        this.NivelAccesoPermiso();
        this.NivelAccesoReportes();
        this.NivelAccesoConfig();
        return;
      }
    } catch (error) {
      console.log("Error");
      console.log(error);
    }
  }

  salir(){
    this.authS.logout()
      .then( () =>{
        //this.router.navigate(['login']);
        window.location.reload();
      }).catch(err =>{
        console.log(err);
      })

  }

  public NivelAccesoSobre(){
    if( this.acceso === "denegado" || this.tipo === "Director" || this.tipo === "Coordinacion"|| this.tipo === "Admin"  ){
      this.sobre = false;
    }else if( this.acceso === "acceso permitido" && ( this.tipo === "Celula" ) )
      this.sobre = true;
  }
  public NivelAccesoPermiso(){
    this.permiso = this.acceso === "acceso permitido" && this.tipo === "Admin";
  }
  public NivelAccesoReportes(){
    if( this.acceso === "acceso permitido" && ( this.tipo === "Admin" || this.tipo === "Coordinacion" || this.tipo === "Director" ) ){
      this.reportes = true;
    }else 
      this.reportes = false;
  }
  public NivelAccesoConfig(){
    this.config = this.acceso === "acceso permitido" && this.tipo === "Admin";
    this.sobreAdmin = this.acceso === "acceso permitido" && this.tipo === "Admin";
  }

  //Preguntar si tiene Permisos
  /*
  public estadoDeCuenta(){
    // Permiso BD
    this.conexion.leerPermiso(this.email).subscribe( (x: Cuenta[]) =>{
      let cuentas = x;
      if(cuentas.length > 0){
          this.acceso = cuentas[0].permiso; // Acceso o no
          this.tipo = cuentas[0].cuenta;  // Tipo de Cuenta
          this.conexion.setNumero( cuentas[0].numero ); // celula o coordinacion
          this.conexion.setPermiso(cuentas[0].permiso, cuentas[0].cuenta);
      }else{
        this.conexion.setPermiso( "Sin permisos", "sin asignar");
      }
    });
  }
*/
}
