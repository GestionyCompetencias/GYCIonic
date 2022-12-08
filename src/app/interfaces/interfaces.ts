export interface Componente {
    icon: string,
    title: string,
    redirectTo: string
  }
  
  export interface Marker {
    lat: number;
    lng: number;
    fecha: string;
    hora: string;
    tipo: string;
    rut: string;
    trabajador: number;
  }