import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../../services/conexion.service';
import { Bautismo } from '../../interfaces/inferfaces';

@Component({
  selector: 'upload-bautisos',
  templateUrl: './upload-bautisos.component.html',
  styles: [
  ]
})
export class UploadBautisosComponent implements OnInit {

  public contador: number;

  constructor( private servicio:ConexionService ) {
    this.contador = 0;
  }

  ngOnInit(): void {
  }

  subirBd(){
    if( this.contador >= this.bd.length ){
      return;
    }
    // Crear Sobre
    const bautismo:Bautismo = {
      nombre:           this.bd[this.contador].nombre,
      domicilio:        this.bd[this.contador]?.domicilio,
      telefonoC:        this.bd[this.contador]?.telefonoC,
      celula:           Number( this.bd[this.contador].celula),
      padreEspiritual:  this.bd[this.contador]?.padreEspiritual,
      telefonoPE:       this.bd[this.contador]?.telefonoPE,
      periodo:          Number( this.bd[this.contador].periodo ),
    }
    this.servicio.addBautismo( bautismo ,'B-2021-07-12 : 2022-07-10' )
      .then( () =>{
        this.contador++;
        this.subirBd();
      }).catch( er =>{
        console.log(er);
      });
  }

  public bd:any[]=[
        {
            nombre: "GUADALUPE REYES BRITO",
            domicilio: "x",
            telefonoC: "x",
            celula: "513",
            padreEspiritual: "MIRIAM BRITO LORENZO",
            telefonoPE: "9933783572",
            periodo: "1"
        },
        {
            nombre: "ALEJANDRO GONZALEZ SANCHEZ",
            domicilio: "IXTACOMITAN 1 SECCION KM. 3",
            telefonoC: "9931769305",
            celula: "514",
            padreEspiritual: "FRANCISCO HERNANDEZ",
            telefonoPE: "9934023766",
            periodo: "1"
        },
        {
            nombre: "YOSSYBETH JUAREZ GARCIA",
            domicilio: "JACONA TAPILULA CHIAPAS",
            telefonoC: "9191145029",
            celula: "501",
            padreEspiritual: "LAURA VALENCIA MENDEZ",
            telefonoPE: "9931177611",
            periodo: "1"
        },
        {
            nombre: "EMANUEL CASTELLANO HERNANDEZ",
            domicilio: "x",
            telefonoC: "x",
            celula: "118",
            padreEspiritual: "SEBASTIAN RIOS PERALTA",
            telefonoPE: "9931966683",
            periodo: "1"
        },
        {
            nombre: "ALFREDO ANTONIO MARHX POZOS",
            domicilio: "FRAY BARTOLOME DE LAS CASAS NO. 1 COL. FRANCISCO VILLA",
            telefonoC: "9932281781",
            celula: "115",
            padreEspiritual: "ROGERIO ABRAHAM CASTRO",
            telefonoPE: "9933784206",
            periodo: "1"
        },
        {
            nombre: "RICARDO PERAZA GARCIA",
            domicilio: "x",
            telefonoC: "x",
            celula: "113",
            padreEspiritual: "KARLA MARIA SUAREZ ",
            telefonoPE: "9932865648",
            periodo: "1"
        },
        {
            nombre: "SERGIO RAMIREZ FLORES",
            domicilio: "PROLONGACION RIVERO 1228 COL. GAVIOTAS NORTE",
            telefonoC: "9931160336",
            celula: "109",
            padreEspiritual: "PATY BROCA GARCIA",
            telefonoPE: "9932172243",
            periodo: "1"
        },
        {
            nombre: "ROBERTO MAYNEZ IZQUIERDO",
            domicilio: "x",
            telefonoC: "9931051377",
            celula: "110",
            padreEspiritual: "CARLOS OCHOA",
            telefonoPE: "9934029428",
            periodo: "1"
        },
        {
            nombre: "ANDRES RAFAEL GOMEZ CRUZ",
            domicilio: "ESTANZUELA 2DA SECCION FRACC. CASA GEO",
            telefonoC: "9933481919",
            celula: "112",
            padreEspiritual: "HILDEBRANDO JIMENEZ",
            telefonoPE: "9933051267",
            periodo: "1"
        },
        {
            nombre: "CARLOS DANIEL OSORIO DE LOS SANTOS",
            domicilio: "BUENAVISTA 4TA SECCION KM. 17.5 ENTRADA A LA TERRAZA",
            telefonoC: "x",
            celula: "205",
            padreEspiritual: "GABRIELA CONCEPCION ",
            telefonoPE: "9931945899",
            periodo: "1"
        },
        {
            nombre: "VICTOR MANUEL OSORIO DE LOS SANTOS",
            domicilio: "BUENAVISTA 4TA SECCION KM. 17.5 ENTRADA A LA TERRAZA",
            telefonoC: "x",
            celula: "205",
            padreEspiritual: "GABRIELA CONCEPCION ",
            telefonoPE: "9931945899",
            periodo: "1"
        },
        {
            nombre: "JENY HERNANDEZ HERNANDEZ",
            domicilio: "BUENAVISTA 4TA SECCION KM. 18 CARRETERA LA ISLA",
            telefonoC: "9933747018",
            celula: "205",
            padreEspiritual: "GABRIELA CONCEPCION ",
            telefonoPE: "9931945899",
            periodo: "1"
        },
        {
            nombre: "YOSELIN JIMENEZ VAZQUEZ",
            domicilio: "x",
            telefonoC: "x",
            celula: "215",
            padreEspiritual: "ANA LUZ JIMENEZ",
            telefonoPE: "9931929188",
            periodo: "1"
        },
        {
            nombre: "RAUL MENDEZ LEZCANO",
            domicilio: "ORBELIN CASTRO S/N COL. MIGUEL HIDALGO",
            telefonoC: "9933635161",
            celula: "206",
            padreEspiritual: "AURIA CAMPO REYES",
            telefonoPE: "9931121289",
            periodo: "1"
        },
        {
            nombre: "GENESIS REYES CRUZ",
            domicilio: "BUENAVISTA POR FUERA KM. 5.7 CARRETERA LA ISLA",
            telefonoC: "x",
            celula: "303",
            padreEspiritual: "INOCENTA REYES",
            telefonoPE: "9932172112",
            periodo: "1"
        },
        {
            nombre: "JARETZY MARELI ACOSTA VALENCIA",
            domicilio: "PLATANO Y CACAO NO. 214 COL LA MANGA 2",
            telefonoC: "9933243002",
            celula: "303",
            padreEspiritual: "HUMBERTO ACOSTA",
            telefonoPE: "9934569463",
            periodo: "1"
        },
        {
            nombre: "MARIA DEL CARMEN DIAZ MONTEJO",
            domicilio: "CARRET. BUENAVISTA COL. SIBILLA ZURITA",
            telefonoC: "9934851285",
            celula: "701",
            padreEspiritual: "ALEJANDRO",
            telefonoPE: "9933023421",
            periodo: "1"
        },
        {
            nombre: "LUZ MARIA OLA DIAZ",
            domicilio: "CARRET. BUENAVISTA COL. SIBILLA ZURITA",
            telefonoC: "9381526918",
            celula: "701",
            padreEspiritual: "ALEJANDRO",
            telefonoPE: "9933023421",
            periodo: "1"
        },
        {
            nombre: "JOSE DE LA CRUZ JIMENEZ RICARDEZ",
            domicilio: "R/A ANACLETO CANABAL 4TA SECCION",
            telefonoC: "9932397582",
            celula: "309",
            padreEspiritual: "CRISTIAN C.",
            telefonoPE: "9932798219",
            periodo: "1"
        },
        {
            nombre: "ISAAC RAFAEL VAZQUEZ VAZQUEZ",
            domicilio: "COL. MIGUEL HIDALGO CALLE LEONA VICARIO",
            telefonoC: "x",
            celula: "314",
            padreEspiritual: "ELIZABETH MARTINEZ",
            telefonoPE: "9933302390",
            periodo: "1"
        },
        {
            nombre: "CARLOS ELO RAMOS MARTINEZ",
            domicilio: "COL. MIGUEL HIDALGO CALLE LEONA VICARIO",
            telefonoC: "x",
            celula: "314",
            padreEspiritual: "ELIZABETH MARTINEZ",
            telefonoPE: "9933302390",
            periodo: "1"
        },
        {
            nombre: "JESSICA DEL CARMEN GOMEZ GARCIA",
            domicilio: "CALLE PEDRO MORENO NO. 4 COL. MIGUEL HIDALGO",
            telefonoC: "9932853052",
            celula: "316",
            padreEspiritual: "WENDY CECILIA ACOSTA",
            telefonoPE: "9933725263",
            periodo: "1"
        },
        {
            nombre: "MANUEL PRIEGO BAUTISTA",
            domicilio: "CALLE PERSEO COL. ESTRELLAS DE BUENATISTA",
            telefonoC: "9934453561",
            celula: "705",
            padreEspiritual: "JOSE ANGUIANO SUAREZ",
            telefonoPE: "99320683547",
            periodo: "1"
        },
        {
            nombre: "CESAR ANTONIO GONZALES CANO",
            domicilio: "CARRETERA A BUENAVISTA COL. SIBILLA ZURITA CALLE 1",
            telefonoC: "9932347835",
            celula: "301",
            padreEspiritual: "PEDRO IVAN TORRES",
            telefonoPE: "9934037354",
            periodo: "1"
        },
        {
            nombre: "KARINA DEL CARMEN ZAPATA TOBILLA",
            domicilio: "CARRETERA A BUENAVISTA COL. SIBILLA ZURITA CALLE 1",
            telefonoC: "9935176965",
            celula: "301",
            padreEspiritual: "PEDRO IVAN TORRES",
            telefonoPE: "9934037354",
            periodo: "1"
        },
        {
            nombre: "VALERIA MONSERRAT SANTO MARTINEZ",
            domicilio: "x",
            telefonoC: "x",
            celula: "320",
            padreEspiritual: "DANIEL JIMENEZ",
            telefonoPE: "9933884606",
            periodo: "1"
        },
        {
            nombre: "KARLA YURIDIA PEREZ RUIZ",
            domicilio: "CALLE JOSE MARIA MORELOS Y PAVON NO.108 SECTOR MORELOS COL. MIGUEL HIDALGO",
            telefonoC: "9932608050",
            celula: "307",
            padreEspiritual: "CONSUELO RUIZ LOPEZ",
            telefonoPE: "9932592109",
            periodo: "1"
        },
        {
            nombre: "GEOVANI ROMAN DE LA CRUZ",
            domicilio: "CERRADA MORELOS NO. 2 SECTOR MORELOS",
            telefonoC: "9934282761",
            celula: "317",
            padreEspiritual: "LUZ DEL ALBA DE LA CRUZ",
            telefonoPE: "9932388538",
            periodo: "1"
        },
        {
            nombre: "DUNIA CANDELARIA HERNANDEZ RAMIREZ",
            domicilio: "MARIANO MATAMOROS NO. 122 COL. MIGUEL HIDALGO",
            telefonoC: "9931708387",
            celula: "616",
            padreEspiritual: "JUANITA SANCHEZ",
            telefonoPE: "9931215099",
            periodo: "1"
        },
        {
            nombre: "JONATHAN LOPEZ LOPEZ",
            domicilio: "COL. CARRIZAL CALLE ANTONIO REYES",
            telefonoC: "9931525754",
            celula: "408",
            padreEspiritual: "JUAN GARCIA CANO",
            telefonoPE: "9934387102",
            periodo: "1"
        },
        {
            nombre: "GIL PEREZ MAMPULA",
            domicilio: "x",
            telefonoC: "9934318357",
            celula: "411",
            padreEspiritual: "ANGEL GARCIA GOMEZ",
            telefonoPE: "9931259138",
            periodo: "1"
        },
        {
            nombre: "HERNAN GARCIA PECH",
            domicilio: "x",
            telefonoC: "9931259138",
            celula: "411",
            padreEspiritual: "ANGEL GARCIA GOMEZ",
            telefonoPE: "9931259138",
            periodo: "1"
        },
        {
            nombre: "JARED ALEJANDRO ",
            domicilio: "x",
            telefonoC: "x",
            celula: "414",
            padreEspiritual: "GUSTAVO ALONSO PEREZ",
            telefonoPE: "9932146588",
            periodo: "1"
        },
        {
            nombre: "MARIA DE LOS ANGELES VILLAMIL GOMEZ",
            domicilio: "x",
            telefonoC: "x",
            celula: "601",
            padreEspiritual: "ROSALBA HERNANDEZ",
            telefonoPE: "9931656441",
            periodo: "1"
        },
        {
            nombre: "CARLOS ENRIQUE MENDEZ CAJIJA",
            domicilio: "NICOLAS BRAVO",
            telefonoC: "9932798009",
            celula: "509",
            padreEspiritual: "ANDRE LOZANO",
            telefonoPE: "9931123330",
            periodo: "1"
        },
        {
            nombre: "CRISTIAN DENIS JIMENEZ BALAN",
            domicilio: "HERMANEGILDO GALEANA S/N COL. MIGUEL HIDALGO",
            telefonoC: "9931299536",
            celula: "115",
            padreEspiritual: "ROGELIO ABRAHAM",
            telefonoPE: "9932392117",
            periodo: "1"
        },
        {
            nombre: "JOVANI DEL CARMEN DE LOS SANTOS GARCIA",
            domicilio: "REVOLUCION DE ATASTA NO. 221",
            telefonoC: "9931894409",
            celula: "112",
            padreEspiritual: "ROCHY VILLEGAS",
            telefonoPE: "9934284828",
            periodo: "1"
        },
        {
            nombre: "JOSE FRANCISCO CHABLE ORTIZ",
            domicilio: "REVOLUCION DE ATASTA NO. 221",
            telefonoC: "9932862498",
            celula: "112",
            padreEspiritual: "HILDEBRANDO JIMENEZ",
            telefonoPE: "9933051267",
            periodo: "1"
        },
        {
            nombre: "LUIS ENRIQUE AGUILAR PEREZ",
            domicilio: "REVOLUCION DE ATASTA NO. 221",
            telefonoC: "9931007298",
            celula: "112",
            padreEspiritual: "HILDEBRANDO JIMENEZ",
            telefonoPE: "9933051267",
            periodo: "1"
        },
        {
            nombre: "ROMANA ORTIZ GARCIA",
            domicilio: "REVOLUCION DE ATASTA NO. 221",
            telefonoC: "9932608948",
            celula: "112",
            padreEspiritual: "ROCHY VILLEGAS",
            telefonoPE: "9934284828",
            periodo: "1"
        },
        {
            nombre: "VIANEY SANCHEZ RODRIGUEZ",
            domicilio: "LA GUAYRA",
            telefonoC: "9843199774",
            celula: "208",
            padreEspiritual: "MARIA GUADALUPE MORALES",
            telefonoPE: "9933064046",
            periodo: "1"
        },
        {
            nombre: "IVETH MARELI LEON MARQUEZ",
            domicilio: "CERRADA EDUARDO GARCIA NO. 271 INTERIOR 14",
            telefonoC: "9934032454",
            celula: "408",
            padreEspiritual: "FIORELA MAYTE TORRES",
            telefonoPE: "9933786129",
            periodo: "1"
        },
        {
            nombre: "MARIA ISABEL HERNANDEZ RAMON",
            domicilio: "CARR. RIO VIEJO 2DA SECCION KM. 7.5",
            telefonoC: "9933913258",
            celula: "609",
            padreEspiritual: "NORMA EDITH BARRERA",
            telefonoPE: "9932432479",
            periodo: "1"
        },
        {
            nombre: "ALEX PEREZ LOPEZ",
            domicilio: "CARR. RIO VIEJO 2DA SECCION KM. 7.5",
            telefonoC: "9933913258",
            celula: "609",
            padreEspiritual: "NORMA EDITH BARRERA",
            telefonoPE: "9932432479",
            periodo: "1"
        },
        {
            nombre: "JUAN PABLO PEREZ HERNANDEZ",
            domicilio: "CARR. RIO VIEJO 2DA SECCION KM. 7.5",
            telefonoC: "9933913258",
            celula: "609",
            padreEspiritual: "NORMA EDITH BARRERA",
            telefonoPE: "9932432479",
            periodo: "1"
        },
        {
            nombre: "ANGEL JUAN VIDAL ALVARADO ",
            domicilio: "SAMARKANDA S/N R/A SAMARKANDA",
            telefonoC: "9932148359",
            celula: "419",
            padreEspiritual: "JOSE VIDAL",
            telefonoPE: "9932148359",
            periodo: "1"
        },
        {
            nombre: "GUADALUPE CAMACHO ZAPATA",
            domicilio: "COL. MIGUEL HIDALGO CALLE MIGUEL HIDALGO",
            telefonoC: "9934047401",
            celula: "406",
            padreEspiritual: "EDERLINDA DE LOS SANTOS",
            telefonoPE: "9932087247",
            periodo: "1"
        },
        {
            nombre: "MARIA ASUNCION GASPAR ADORNO",
            domicilio: "CALLE CRISTOBAL COLON NO. 201 INTERIOR 1 COL. TAMULTE",
            telefonoC: "9934024172",
            celula: "101",
            padreEspiritual: "JOSE DAVID GARCIA CORREA",
            telefonoPE: "9932029989",
            periodo: "2"
        },
        {
            nombre: "MIRIAN GUADALUE JUAREZ GASPAR",
            domicilio: "CALLE CRISTOBAL COLON NO. 201 INTERIOR 1 COL. TAMULTE",
            telefonoC: "9931121691",
            celula: "101",
            padreEspiritual: "JOSE DAVID GARCIA CORREA",
            telefonoPE: "9932029989",
            periodo: "2"
        },
        {
            nombre: "MIRIAM ODALIS ESCALANTE CASTRO",
            domicilio: "FRACC. EDEN PREMIER NO. 9 COL. SABINA",
            telefonoC: "x",
            celula: "101",
            padreEspiritual: "JOSE DAVID GARCIA CORREA",
            telefonoPE: "9932029989",
            periodo: "2"
        },
        {
            nombre: "VICTORIA ZOE HERNANDEZ BAUTISTA",
            domicilio: "CARR. GIL PEREZ KM. 11 BOQUERON",
            telefonoC: "9931703285",
            celula: "514",
            padreEspiritual: "FRANCISCO HERNANDEZ ",
            telefonoPE: "x",
            periodo: "2"
        },
        {
            nombre: "CITLALLI DEL CARMEN GALVEZ MARCIAL",
            domicilio: "GUINEO 1RA SECCION KM. 12",
            telefonoC: "9932144938",
            celula: "120",
            padreEspiritual: "JULIO ENRIQUE PEREZ EHUAN",
            telefonoPE: "9935222992",
            periodo: "2"
        },
        {
            nombre: "LORIS ALI NARES",
            domicilio: "FRAY BARTOLOME NO. 1 COL. FCO. VILLA, REFORMA CHIAPAS",
            telefonoC: "7821932997",
            celula: "115",
            padreEspiritual: "ABRAHAM CASTRO",
            telefonoPE: "9933784206",
            periodo: "2"
        },
        {
            nombre: "VALERIA SARAI HERNANDEZ GARCIA",
            domicilio: "AV. INDEPENDENCIA MZ. 20 COL. MIGUEL HIDALGO",
            telefonoC: "9935935296",
            celula: "507",
            padreEspiritual: "NOEMI GARCIA MAY",
            telefonoPE: "9935935296",
            periodo: "2"
        },
        {
            nombre: "ITZEL ALEJANDRA RAMIREZ RASCON",
            domicilio: "PROLONGACION PEPE RIVERO 1228 GAVIOTAS NORTE",
            telefonoC: "9931122246",
            celula: "109",
            padreEspiritual: "FELICIANO LANDERO",
            telefonoPE: "9931728019",
            periodo: "2"
        },
        {
            nombre: "ANGELINE GUADALUPE MARTINEZ ALVAREZ",
            domicilio: "CARRET. LA ISLA 80 MT. PERFICERICO COL. MIGUEL HIDALGO",
            telefonoC: "9932799115",
            celula: "110",
            padreEspiritual: "CARLOS OCHOA ",
            telefonoPE: "9934029428",
            periodo: "2"
        },
        {
            nombre: "EDGAR ADRIAN MANUBES",
            domicilio: "FRACC. ISLA MZ.5 CALLE POCHITOQUE",
            telefonoC: "9933784615",
            celula: "219",
            padreEspiritual: "CANDELARIO RAMOS",
            telefonoPE: "9933784615",
            periodo: "2"
        },
        {
            nombre: "JUAN CARLOS RAMIREZ PEREZ",
            domicilio: "BUENAVISTA 1RA SECCION (LA ISLA)",
            telefonoC: "9931201627",
            celula: "201",
            padreEspiritual: "ESDRAS YAHEL TRUJILLO ",
            telefonoPE: "9934074932",
            periodo: "2"
        },
        {
            nombre: "ISABEL PEREZ MARTINEZ",
            domicilio: "R/A BUENAVISTA 1RA SECCION (RIO NUEVO)",
            telefonoC: "9932878074",
            celula: "201",
            padreEspiritual: "MARTHA TRUJILLO",
            telefonoPE: "9934074932",
            periodo: "2"
        },
        {
            nombre: "LAURA YESENIA DE LA CRUZ PEREZ ",
            domicilio: "BUENAVISTA 1RA SECCION KM. 5.5 ",
            telefonoC: "9934349979",
            celula: "201",
            padreEspiritual: "MARTHA TRUJILLO",
            telefonoPE: "9934074932",
            periodo: "2"
        },
        {
            nombre: "CRISTIAN TOGA COTO",
            domicilio: "COL. LIBERTAD CALLE LA GALLERA S/N",
            telefonoC: "x",
            celula: "303",
            padreEspiritual: "HUMBERTO ACOSTA",
            telefonoPE: "9934569463",
            periodo: "2"
        },
        {
            nombre: "SARA DANIELA SANCHEZ RODRIGUEZ",
            domicilio: "R/A BUENAVISTA 1RA SECCION ZIBILLA ZURITA 1RA ENT. CARLOS CESAR GIL",
            telefonoC: "x",
            celula: "701",
            padreEspiritual: "LEYDI CRISTELL GUTIERREZ",
            telefonoPE: "9932588414",
            periodo: "2"
        },
        {
            nombre: "ISRAEL SANCHEZ RODRIGUEZ",
            domicilio: "R/A BUENAVISTA 1RA SECCION ZIBILLA ZURITA 1RA ENT. CARLOS CESAR GIL",
            telefonoC: "x",
            celula: "701",
            padreEspiritual: "LEYDI CRISTELL GUTIERREZ",
            telefonoPE: "9932588414",
            periodo: "2"
        },
        {
            nombre: "MARTIN VILLASIS PEREZ",
            domicilio: "COL. MIGUEL HIDALGO CERRADA PIPILA MZ. 42",
            telefonoC: "x",
            celula: "314",
            padreEspiritual: "ELIZABETH MARTINEZ",
            telefonoPE: "9933302390",
            periodo: "2"
        },
        {
            nombre: "KEVIN VARGAS DE LA CRUZ",
            domicilio: "COL. INDECO ZONA FEDERAL",
            telefonoC: "x",
            celula: "316",
            padreEspiritual: "JORGE LUIS FRIAS",
            telefonoPE: "9934012175",
            periodo: "2"
        },
        {
            nombre: "WENDY CERINO CALLES",
            domicilio: "CALLE PUERTO ESCONDIDO NO. 132 COL. ATASTA",
            telefonoC: "9934477741",
            celula: "316",
            padreEspiritual: "AMELIA DUARTES",
            telefonoPE: "9933775165",
            periodo: "2"
        },
        {
            nombre: "GUADALUPE GERONIMO PINEDA",
            domicilio: "ESTRELLA REAL MZ. 52 LT. 23",
            telefonoC: "9932836897",
            celula: "320",
            padreEspiritual: "SARA MUÑOZ CANUL",
            telefonoPE: "9934420390",
            periodo: "2"
        },
        {
            nombre: "CESAR GERARDO ESPINOSA ZURITA",
            domicilio: "FRACC. HACIENDA DE BUENAVISTA CALLE FRAMBOYAN LT. 1 MZ. 8",
            telefonoC: "9933831290",
            celula: "318",
            padreEspiritual: "EDISON CAPETILLO ",
            telefonoPE: "9935902511",
            periodo: "2"
        },
        {
            nombre: "MARLENE CARRILLO PEREZ",
            domicilio: "CALLE OSA MENOR MZ. 17 LT. 2 FRACC. ESTRELLAS DE BUENAVISTA",
            telefonoC: "9932082993",
            celula: "451",
            padreEspiritual: "SERGIO ORTEGON",
            telefonoPE: "9932085423",
            periodo: "2"
        },
        {
            nombre: "ELIZABETH HERNANDEZ SANCHEZ",
            domicilio: "CALLE OSA MENOR MZ. 14 LT. 35 FRACC. ESTRELLAS DE BUENAVISTA",
            telefonoC: "9932332216",
            celula: "451",
            padreEspiritual: "MARIA DE JESUS CARTELA",
            telefonoPE: "9932115596",
            periodo: "2"
        },
        {
            nombre: "JULIO CESAR ACOSTA AGUILAR",
            domicilio: "CALLE ALAMEDA SUR NO. 47 FRACC. UJAT",
            telefonoC: "9932187127",
            celula: "416",
            padreEspiritual: "MANUELITA HERNANDEZ",
            telefonoPE: "9932069034",
            periodo: "2"
        },
        {
            nombre: "SAUL HERNANDEZ GOMEZ",
            domicilio: "CALLE PEDRO MORANO MZ. 1 LT. 26 COL. MIGUEL HIDALGO",
            telefonoC: "9931924832",
            celula: "410",
            padreEspiritual: "JESSICA HERNANDEZ",
            telefonoPE: "9931894269",
            periodo: "2"
        },
        {
            nombre: "BENJAMIN GONZALEZ BALIER",
            domicilio: "R/A RIO TINTO SEGUNDA SECCION",
            telefonoC: "x",
            celula: "518",
            padreEspiritual: "CRISTOBAL NUÑEZ PALMA",
            telefonoPE: "9934047407",
            periodo: "2"
        },
        {
            nombre: "MAURO PEREZ LOPEZ",
            domicilio: "MARIANO ARISTA MZ. 11 LT. 24",
            telefonoC: "9933834733",
            celula: "117",
            padreEspiritual: "MIGUEL AMEZQUITA ",
            telefonoPE: "9932137000",
            periodo: "2"
        },
        {
            nombre: "MARGARITA HERNANDEZ HERNANDEZ",
            domicilio: "MARIANO ARISTA MZ. 11 LT. 24",
            telefonoC: "9934070557",
            celula: "117",
            padreEspiritual: "JOSEFINA BALAM",
            telefonoPE: "9932834733",
            periodo: "2"
        },
        {
            nombre: "JUANA JANET ALCUDIA RAMIREZ",
            domicilio: "POBLADO CUCUYULAPA, CUNDUACAN",
            telefonoC: "9933965710",
            celula: "111",
            padreEspiritual: "CARLOS MARIO CORREA",
            telefonoPE: "9931625194",
            periodo: "2"
        },
        {
            nombre: "MARIA DEL ROSARIO COLORADO DIAZ",
            domicilio: "R/A BUENAVISTA 4TA SECCION",
            telefonoC: "9931573819",
            celula: "205",
            padreEspiritual: "GABRIELA CONCEPCION",
            telefonoPE: "9931945899",
            periodo: "2"
        },
        {
            nombre: "XIMENA BAUTISTA PEREZ",
            domicilio: "FRACC. RIVERA",
            telefonoC: "9932524450",
            celula: "205",
            padreEspiritual: "SARAI CONCEPCION",
            telefonoPE: "9931253377",
            periodo: "2"
        },
        {
            nombre: "LUCIANO RAFAEL MORALES MORALES",
            domicilio: "R/A MIGUEL HIDALGO 2DA SECCION SECTOR GUAYNARA",
            telefonoC: "9933064096",
            celula: "208",
            padreEspiritual: "EMILIO LAZARO",
            telefonoPE: "9932874097",
            periodo: "2"
        },
        {
            nombre: "AZUCENA RAMIREZ DE LOS SANTOS",
            domicilio: "R/A BUENAVISTA RIO NUEVO 3RA SECCION ENTRADA AL TINTO",
            telefonoC: "9932158670",
            celula: "212",
            padreEspiritual: "ALFONSO PEREGRINO",
            telefonoPE: "9933748300",
            periodo: "2"
        },
        {
            nombre: "NURY CORDOVA DE LA CRUZ",
            domicilio: "R/A LAZARO CARDENAS 1RA SECCION",
            telefonoC: "9933960662",
            celula: "309",
            padreEspiritual: "BLANCA ESTELA SILVAN",
            telefonoPE: "9933960662",
            periodo: "2"
        },
        {
            nombre: "YAMILED RODRIGUEZ CORDOVA",
            domicilio: "R/A LAZARO CARDENAS 1RA SECCION",
            telefonoC: "9931147051",
            celula: "309",
            padreEspiritual: "BLANCA ESTELA SILVAN",
            telefonoPE: "9933960662",
            periodo: "2"
        },
        {
            nombre: "JUAN ANGEL TOSCA GARDUZA",
            domicilio: "COL. MIGUEL HIDALGO PRIVADA LAS PALMAS",
            telefonoC: "9988955675",
            celula: "306",
            padreEspiritual: "SERGIO DOMINGUEZ",
            telefonoPE: "9931838730",
            periodo: "2"
        },
        {
            nombre: "YUDEX IVAN REYES CASTRO",
            domicilio: "COL. ATASTA CALLE BUENAVISTA NO. 537",
            telefonoC: "9934301088",
            celula: "306",
            padreEspiritual: "NATIVIDAD TOSCA PIEDRA",
            telefonoPE: "9931219644",
            periodo: "2"
        },
        {
            nombre: "VICTOR RAMON NOTARIO LEON",
            domicilio: "CALLE JOSE MORENO IRABIEN COL. 1RA DE MAYO",
            telefonoC: "9931204645",
            celula: "306",
            padreEspiritual: "ISAIAS",
            telefonoPE: "9931204645",
            periodo: "2"
        },
        {
            nombre: "CARLOS ANDRES ALONSO PEREZ",
            domicilio: "CALLE PIPILA MZ. 6 LT. 18",
            telefonoC: "5580551207",
            celula: "610",
            padreEspiritual: "DAVID RAMON VILLASIS",
            telefonoPE: "9932102114",
            periodo: "2"
        },
        {
            nombre: "EVELYN MATA BARAJAS",
            domicilio: "RETEN BUENAVISTA 2DA SECCION CERRADA ISABEL S/N",
            telefonoC: "9935451778",
            celula: "618",
            padreEspiritual: "PAOLA GUADALUPE",
            telefonoPE: "9372291083",
            periodo: "2"
        },
        {
            nombre: "ANDRES GAEL RUIZ MENDEZ",
            domicilio: "R/A BUENA VISTA RIO NUEVO 2DA SECCION (POR DENTRO)",
            telefonoC: "9931152709",
            celula: "619",
            padreEspiritual: "JULIO CESAR ZARRAZAGA",
            telefonoPE: "9931152709",
            periodo: "2"
        },
        {
            nombre: "DULCE MARIA SOLIS RAMIREZ",
            domicilio: "R/A BOQUERON ENTRADA EL MANGUITO",
            telefonoC: "9935165667",
            celula: "514",
            padreEspiritual: "MARIA OFELIA BAUTISTA",
            telefonoPE: "9931703285",
            periodo: "3"
        },
        {
            nombre: "HUMBERTO PEREZ MADRIGAL",
            domicilio: "NACAJUCA R/A TAXCO",
            telefonoC: "9141231957",
            celula: "118",
            padreEspiritual: "SEBASTIAN RIOS",
            telefonoPE: "9931966683",
            periodo: "3"
        },
        {
            nombre: "BENYAMIN MARTINEZ JIMENEZ",
            domicilio: "COL. MIGUEL HIDALGO CALLE MARIA JOSE",
            telefonoC: "9932842355",
            celula: "102",
            padreEspiritual: "FRANCISCO PEDIAN",
            telefonoPE: "9983889381",
            periodo: "3"
        },
        {
            nombre: "DAVID TORRES VALLES ",
            domicilio: "CERRADA DURANGO NO. 62 COL MIGUEL HIDALGO",
            telefonoC: "x",
            celula: "102",
            padreEspiritual: "MARIA CONCEPCION ",
            telefonoPE: "9932065669",
            periodo: "3"
        },
        {
            nombre: "ROMANA VELAZQUEZ VELOS SANTOS",
            domicilio: "AV. MIGUEL HIDALGO",
            telefonoC: "9931485011",
            celula: "110",
            padreEspiritual: "CARLOS OCHOA ROMERO",
            telefonoPE: "9934029428",
            periodo: "3"
        },
        {
            nombre: "CONSUELO JIMENEZ ZAPATA",
            domicilio: "FRACC. BICENTENARIO CALLE TOCOAL",
            telefonoC: "x",
            celula: "111",
            padreEspiritual: "CAROLINA SERAFIN",
            telefonoPE: "9932028085",
            periodo: "3"
        },
        {
            nombre: "JAIRO AGUILERA CHABLE",
            domicilio: "BUENAVISTA 2DA SECCION ",
            telefonoC: "x",
            celula: "207",
            padreEspiritual: "CARLOS AGUILERA",
            telefonoPE: "9932199904",
            periodo: "3"
        },
        {
            nombre: "BRYAN GONZALEZ CALDERON",
            domicilio: "RETEN KM. 6.5",
            telefonoC: "9931797006",
            celula: "212",
            padreEspiritual: "RICARDO IVAN HERRERA",
            telefonoPE: "9933639079",
            periodo: "3"
        },
        {
            nombre: "LEONARDO PEREGRINO SANTO",
            domicilio: "R/A BUENAVISTA 3RA SECCION",
            telefonoC: "9932150075",
            celula: "212",
            padreEspiritual: "ALFONSO PEREGRINO ",
            telefonoPE: "9933748300",
            periodo: "3"
        },
        {
            nombre: "PEDRO GOMEZ ARRONIZ",
            domicilio: "MARIO TRUJILLO NO. 113 - 4",
            telefonoC: "9932154398",
            celula: "220",
            padreEspiritual: "FERNANDO CAMARGO",
            telefonoPE: "9932154398",
            periodo: "3"
        },
        {
            nombre: "JOSE DEL CARMEN PEREZ MARTINEZ",
            domicilio: "CARRET. BUENAVISTA KM. 10",
            telefonoC: "9932878074",
            celula: "201",
            padreEspiritual: "JOSE NERIO ZARRAZAGA",
            telefonoPE: "9932348784",
            periodo: "3"
        },
        {
            nombre: "GRISELDA MORALES RODRIGUEZ",
            domicilio: "MECHOR OCAMPO NO. 1118",
            telefonoC: "x",
            celula: "701",
            padreEspiritual: "LEIDI CRISTEL GUTIERREZ",
            telefonoPE: "9932588414",
            periodo: "3"
        },
        {
            nombre: "MIGUEL DIAZ ESTEBAN",
            domicilio: "BUENAVISTA 3RA SECCION RIO VIEJO",
            telefonoC: "x",
            celula: "707",
            padreEspiritual: "JORGE DIAZ",
            telefonoPE: "9932645164",
            periodo: "3"
        },
        {
            nombre: "CITLALI GUADALUPE CONCEPCION MARIN",
            domicilio: "COL. MIGUEL HIDAGO CALLE MANUEL ANDRADE ANDADOR 10",
            telefonoC: "x",
            celula: "310",
            padreEspiritual: "CAROLINA MARIN",
            telefonoPE: "9931664086",
            periodo: "3"
        },
        {
            nombre: "MARIANA DEL CARMEN TOSCA PIEDRA",
            domicilio: "CALLE BUENAVISTA NO. 537 COL. ATASTA",
            telefonoC: "9934301088",
            celula: "306",
            padreEspiritual: "SERGIO DOMINGUEZ",
            telefonoPE: "9931838730",
            periodo: "3"
        },
        {
            nombre: "ITZEL CAPETILLO DE LA FUENTE",
            domicilio: "FRACC. RIO VIEJO EDIF. 34 DEP. 302",
            telefonoC: "9935877942",
            celula: "318",
            padreEspiritual: "EDISON CAPETILLO DE LA CRUZ",
            telefonoPE: "9935902511",
            periodo: "3"
        },
        {
            nombre: "JULIO CESAR SALAS LOPEZ",
            domicilio: "JOSE MA. MORELOS, SECTOR MORELOS NO. 108",
            telefonoC: "9931504810",
            celula: "307",
            padreEspiritual: "EDGAR MANUEL SANCHEZ",
            telefonoPE: "9931504810",
            periodo: "3"
        },
        {
            nombre: "KARLA MICHELL ZURITA SANCHEZ",
            domicilio: "CERRADA LA PIEDRA NO. 39 COL. MIGUEL HIDALGO",
            telefonoC: "9932067058",
            celula: "305",
            padreEspiritual: "JULIA TORRES SANCHEZ",
            telefonoPE: "9933328597",
            periodo: "3"
        },
        {
            nombre: "KENIA CRISTELL LOPEZ ALVAREZ",
            domicilio: "R/A BUENAVISTA 2DA SECCION LOS MANGOS",
            telefonoC: "9932796956",
            celula: "606",
            padreEspiritual: "DANIEL OCHOA",
            telefonoPE: "9932785672",
            periodo: "3"
        },
        {
            nombre: "LESLIE GUADALUPE GOMEZ MARTINEZ",
            domicilio: "R/A BUENAVISTA KM. 17 POR FUERA",
            telefonoC: "x",
            celula: "417",
            padreEspiritual: "EMANUEL ACOSTA",
            telefonoPE: "9931469352",
            periodo: "3"
        },
        {
            nombre: "MARIA GUADALUPE SANCHEZ HERNANDEZ",
            domicilio: "COL. MIGUEL HIDALGO CERRADA LA PIEDRA",
            telefonoC: "9341246191",
            celula: "613",
            padreEspiritual: "LUZ YERANI MENDEZ",
            telefonoPE: "9931083480",
            periodo: "3"
        },
        {
            nombre: "ANTELMIA PAOLA MUÑOZ SANCHEZ",
            domicilio: "COL. MIGUEL HIDALGO CERRADA LA PIEDRA",
            telefonoC: "9934449884",
            celula: "613",
            padreEspiritual: "LUZ YERANI MENDEZ",
            telefonoPE: "9931083480",
            periodo: "3"
        },
        {
            nombre: "FELICIANA VAZQUEZ PEREZ",
            domicilio: "COL. MIGUEL HIDALGO CALLE CHILPANCINGO",
            telefonoC: "9381042845",
            celula: "615",
            padreEspiritual: "ARGELIA AGUILAR ",
            telefonoPE: "9931066374",
            periodo: "3"
        },
        {
            nombre: "ERICA LOPEZ LLANAS",
            domicilio: "COL. PETROLERA SECCION 44 LLAMARADA 108",
            telefonoC: "x",
            celula: "109",
            padreEspiritual: "MARTHA BROCA",
            telefonoPE: "9932172243",
            periodo: "3"
        },
        {
            nombre: "DIANA LAURA MARTINEZ TORRES",
            domicilio: "CARRETERA LA ISLA KM. 13",
            telefonoC: "x",
            celula: "111",
            padreEspiritual: "FAUSTO GONZALES",
            telefonoPE: "9932626260",
            periodo: "3"
        },
        {
            nombre: "BLANCA ESTELA ASCENCIO PEREZ",
            domicilio: "R/A BUENAVISTA 2DA SECCION RIO SECO",
            telefonoC: "9932114293",
            celula: "207",
            padreEspiritual: "CARLOS ALFREDO AGUILERA",
            telefonoPE: "9932114793",
            periodo: "3"
        },
        {
            nombre: "DORIS IBARRA HERNANDEZ",
            domicilio: "CALLE 7 NO. 284 FRACC. BONANZA",
            telefonoC: "9934046929",
            celula: "317",
            padreEspiritual: "LORENA PALMA",
            telefonoPE: "9932175922",
            periodo: "3"
        },
        {
            nombre: "NOEMI HERNANDEZ CASTILLO",
            domicilio: "CALLE PORFIRIO DIAZ COL. MIGUEL HIDALGO",
            telefonoC: "9934012016",
            celula: "408",
            padreEspiritual: "MARIA DOLORES CAZARIN",
            telefonoPE: "9935163669",
            periodo: "3"
        },
        {
            nombre: "LETICIA MUÑOZ POTENCIANO",
            domicilio: "CERRADA PROVIDENCIA DE DIOS",
            telefonoC: "9932796956",
            celula: "606",
            padreEspiritual: "DANIEL OCHOA",
            telefonoPE: "9932785672",
            periodo: "3"
        },
        {
            nombre: "FABIOLA DEL CARMEN ALVAREZ MUÑOZ",
            domicilio: "CERRADA LA NARANJA COL. MIGUEL HIDALGO KM. 4 1/2",
            telefonoC: "9935929966",
            celula: "606",
            padreEspiritual: "DANIEL OCHOA",
            telefonoPE: "9932785672",
            periodo: "3"
        },
        {
            nombre: "DELIA CAMACHO PEREZ",
            domicilio: "CERRADA NOPALES SECTOR LAS FLORES RIO SECO CARRET. BUENAVISTA",
            telefonoC: "9931646618",
            celula: "107",
            padreEspiritual: "JESUS DIAZ CHABLE",
            telefonoPE: "9931546618",
            periodo: "4"
        },
        {
            nombre: "EDITH ALVAREZ DE LA CRUZ",
            domicilio: "BUENAVISTA 1RA SECCION",
            telefonoC: "9934618109",
            celula: "212",
            padreEspiritual: "ALFONSO PEREGRINO ",
            telefonoPE: "9933748300",
            periodo: "4"
        },
        {
            nombre: "KARLA GARCIA PEREZ",
            domicilio: "COL. GUADALUPE BORJA ",
            telefonoC: "9934618109",
            celula: "212",
            padreEspiritual: "ALFONSO PEREGRINO ",
            telefonoPE: "9933748300",
            periodo: "4"
        },
        {
            nombre: "SAMANTHA VILLEGAS DELGADO",
            domicilio: "COL. GUADALUPE BORJA CALLE MANZANILLA NO. 202",
            telefonoC: "9931289166",
            celula: "219",
            padreEspiritual: "CANDELARIO RAMOS",
            telefonoPE: "9933784615",
            periodo: "4"
        },
        {
            nombre: "EMMANUEL ANTONIO MONRROY ZAPATA ",
            domicilio: "CALLE ORBELIN CASTRO COL. MIGUEL HIDALGO",
            telefonoC: "9935613326",
            celula: "206",
            padreEspiritual: "URIEL MONRROY GUTIERREZ",
            telefonoPE: "9935613326",
            periodo: "4"
        },
        {
            nombre: "LORENA NOLBERTA PEREZ DIAZ",
            domicilio: "PRIVADA LAS PALMAS COL. MIGUEL HIDALGO",
            telefonoC: "9934439309",
            celula: "312",
            padreEspiritual: "JESUS MANUEL BAYONA VILLAMIL",
            telefonoPE: "9931076102",
            periodo: "4"
        },
        {
            nombre: "CINTHIA ANAIS CRUZ RODRIGUEZ",
            domicilio: "ESTRELLAS DE BUENAVISTA CALLE DORADO MZ. 48 LT. 9",
            telefonoC: "9932785672",
            celula: "606",
            padreEspiritual: "DANIEL OCHOA",
            telefonoPE: "9932783672",
            periodo: "4"
        },
        {
            nombre: "VICTOR MANUEL CASTAN MORENO",
            domicilio: "CARRET. VHSA - REFORMA R/A GUINEO 1RA SECCION KM. 12",
            telefonoC: "9933029748",
            celula: "120",
            padreEspiritual: "PAOLA OCHOA ROMERO",
            telefonoPE: "9932865340",
            periodo: "4"
        },
        {
            nombre: "EDUARDO LOPEZ JIMENEZ ",
            domicilio: "R/A BUENAVISTA 1RA SECCION S/N",
            telefonoC: "9931770081",
            celula: "209",
            padreEspiritual: "RAFAEL GUTIERREZ VELAZQUEZ",
            telefonoPE: "9931164652",
            periodo: "4"
        },
        {
            nombre: "JOSE ARMANDO MAYO MAY",
            domicilio: "CARRETERA BUENAVISTA",
            telefonoC: "9933677187",
            celula: "618",
            padreEspiritual: "KARINA FELIX MAY",
            telefonoPE: "9372291083",
            periodo: "4"
        }
    ]
}
