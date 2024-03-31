import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InfoJveService } from '../../../services/info-jve.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatosService } from '../../../services/datos.service';

@Component({
  selector: 'app-select-ciclos',
  templateUrl: './select-ciclos.component.html',
  styles: [
  ]
})
export class SelectCiclosComponent implements OnInit {

  @Input() showSemana: string;
  @Input() showPeriodo: string;
  @Input() showInactivas: string;
  @Input() showCoord: string;
  @Output() onSeendCicloSemana: EventEmitter<any> = new EventEmitter();

  private iniciarForm: boolean = false;
  private iniciarSemana: boolean = false;

  get cuentaUsuario(){
    return this.datos.cuenta;
  }

  get listCoordinadores(){
    return this.infoJve.listCoordinadores;
  }

  get listPeriodos(){
    const c = this.infoJve.ciclos;
    if( c.length > 0 ){
      if( !this.iniciarForm ){
        this.iniciarForm = true;
        this.formBuscar.controls?.ciclo.setValue(c[0]?.nombre);
        const s = this.datos.calcularSemana( c[0] );
        const p = Math.round( s/5 );
        // iniciar periodo
        this.formBuscar.controls?.periodo.setValue( p );
        // ihniciar semana
        this.formBuscar.controls?.semana.setValue( s );
        // Nombres de Coordinadores
        this.infoJve.nombres( "N-"+c[0]?.nombre);
      }
    }
    return c;
  }
  
  public formBuscar: FormGroup = this.fb.group({
    ciclo : [ , Validators.required ],
    semana : [ 0 ],
    periodo : [ 0 ],
    inactivas: [ false ],
    coordinacion: [ -1 ]
  })

  constructor( private datos: DatosService,
                private infoJve: InfoJveService,
                private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

  public sendCicloSemana(){
    const { ciclo, semana, periodo, coordinacion } = this.formBuscar.value;
    const c = this.listPeriodos.filter( c => c.nombre === ciclo );
    const numeroSemanas = c[0].nSemanas;
    const fechaI:string = c[0].fechaInicial;
    const fechaF:string = c[0].fechaFinal;
    this.onSeendCicloSemana.emit( {ciclo: ciclo, semana: semana, periodo: periodo, nSemanas:numeroSemanas, fechaI:fechaI, fechaF:fechaF, coordinacion:coordinacion} );
    // reset coord
    this.formBuscar.controls?.coordinacion.setValue( -1 );
  }

  changeCoord(){
    const { ciclo } = this.formBuscar.value;
    console.log(ciclo);
    this.infoJve.nombres( "N-"+ciclo );
  }


}
