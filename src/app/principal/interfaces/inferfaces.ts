
export interface Cuenta{
  createFecha: string;
  cuenta: string;
  numero?: number;
  nombre: string;
  telefono: string;
  email: string;
  permiso: string;
  id?: string;
}
export interface Periodo{
  fechaInicial: string;
  fechaFinal: string;
  nombre: string;
  nSemanas: number;
  id?: string;
}
export interface Sobre{
  celula: number;
  fechaRegistro?: string;
  culto_hecho?: number;
  semana: number;
  miembros: number;
  visitas: number;
  ninos: number;
  diezmoLider: number;
  ofrenda: number;
  id?: string;
  verificado: boolean;
}
export interface Celula{
  Celula: number,
  Lider: string,
  nombreSupervisor?: string,
  Supervisor: number,
  SubCoor: number,
  Coordinacion: number,
  estado: number,
  fechaSobre?: string,
  id?: string
}

export interface Nombre{
  tipo: string,
  coordinacion: number,
  nombre: string,
  subCoor?: number,
  id?: string,
}

export interface Bautismo{
  nombre:           string, // *
  fechaB?:          string,
  periodo:          number, // *
  sexo?:            string,
  domicilio?:       string,
  codigoPostal?:    string,
  telefonoC?:       string,
  telefono?:        string,
  correo?:          string,
  fechaNacimiento?: string,
  profesion?:       string,
  celula:           number, // *
  padreEspiritual?: string,
  telefonoPE?:      string,
  id?:              string,
}

export interface Vercion{
  name:string
}

