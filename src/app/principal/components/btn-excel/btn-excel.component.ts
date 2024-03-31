import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-excel',
  templateUrl: './btn-excel.component.html',
  styles: [
  ]
})
export class BtnExcelComponent implements OnInit {

  @Input() tabla_Im: string;
  @Input() nombreT: string;

  constructor() { }

  ngOnInit(): void {
  }

  public fechaTxt(){
    let f = new Date();
    const m =f.getMonth() +1;
    let mm:string = ""+m;
    if(m<10){
        mm='0'+mm;
    }
    return f.getDate() + "/" + mm + "/" + f.getFullYear();
  }
  public descargarExcel():void{
    const descargaLink = document.createElement('a');
    const dataType = 'application/vnd.ms-excel';
    let table = document.getElementById(this.tabla_Im).innerHTML;
    while (table.indexOf('Á') != -1) table = table.replace('Á', '&Aacute;');
    while (table.indexOf('É') != -1) table = table.replace('É', '&Eacute;');
    while (table.indexOf('Í') != -1) table = table.replace('Í', '&Iacute;');
    while (table.indexOf('Ó') != -1) table = table.replace('Ó', '&Oacute;');
    while (table.indexOf('ó') != -1) table = table.replace('ó', '&oacute;');
    while (table.indexOf('Ú') != -1) table = table.replace('Ú', '&Uacute;');
    while (table.indexOf('Ñ') != -1) table = table.replace('Ñ', '&Ntilde;');
    while (table.indexOf('✓') != -1) table = table.replace('✓', '&radic;');
    while (table.indexOf('img') != -1) table = table.replace('img','kkk');
    while (table.indexOf('•') != -1) table = table.replace('•', '&bull;');
    while (table.indexOf('š') != -1) table = table.replace('š', 's');
    while (table.indexOf('¢') != -1) table = table.replace('¢', 'c');
    while (table.indexOf('Φ') != -1) table = table.replace('Φ', 'o');
    while (table.indexOf('#') != -1) table = table.replace('#',' ');
    while (table.indexOf('mode_edit') != -1) table = table.replace('mode_edit',' ');
    while (table.indexOf('delete_sweep') != -1) table = table.replace('delete_sweep',' ');

    const tableHtml = table.replace(/ /g, '%20');
    document.body.appendChild(descargaLink);
    descargaLink.href = 'data:' + dataType + ', ' + tableHtml;
    descargaLink.download = this.nombreT+'-'+this.fechaTxt()+'.xls';
    descargaLink.click();
  }

}
