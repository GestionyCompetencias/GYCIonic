import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Componente } from '../interfaces/interfaces';

const URL = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
              private nativeHttp: HTTP) { }

  getMenuOpts(){
    return this.http.get<Componente[]>('/assets/data/menu.json');
  }

  getInfoPersonal( rut: string, _token: string ){
    const data = { token: _token, rut };
    return this.http.post<any>(`${ URL }personal/Post`, data);
  }
  getInfoPersonalNative( rut: string, _token: string ){
    const data = { token: _token, rut };
    return this.nativeHttp.post(`${ URL }personal/Post`, data, {});
  }

  getMotivos( rut: string,  _token: string ){
    const data = { token: _token, rut };
    return this.http.post<any>(`${ URL }motivo/Post`, data);
  }
  getMotivosNative( rut: string,  _token: string ){
    const data = { token: _token, rut };
    return this.nativeHttp.post(`${ URL }motivo/Post`, data, {});
  }

  getTipoDocumentos( rut: string,  _token: string ){
    const data = { token: _token, rut };
    return this.http.post<any>(`${ URL }tipo/Post`, data);
  }
  getTipoDocumentosNative( rut: string,  _token: string ){
    const data = { token: _token, rut };
    return this.nativeHttp.post(`${ URL }tipo/Post`, data, {});
  }

  getInfoMarcacion( dataFind: any,  _token: string ){
    const data = { token: _token, rut: dataFind.rut, fecha1: dataFind.fecha1, fecha2: dataFind.fecha2 };
    return this.http.post<any>(`${ URL }marcacion/Post`, data);
  }

  getInfoMarcacionNative( dataFind: any,  _token: string ){
    const data = { token: _token, rut: dataFind.rut, fecha1: dataFind.fecha1, fecha2: dataFind.fecha2 };
    return this.nativeHttp.post(`${ URL }marcacion/Post`, data, {});
  }

  getInfoAsistencia( dataFind: any,  _token: string ){
    const data = { token: _token, rut: dataFind.rut, fecha1: dataFind.fecha1, fecha2: dataFind.fecha2 };
    return this.http.post<any>(`${ URL }registro/Post`, data);
  }

  getInfoAsistenciaNative( dataFind: any,  _token: string ){
    const data = { token: _token, rut: dataFind.rut, fecha1: dataFind.fecha1, fecha2: dataFind.fecha2 };
    return this.nativeHttp.post(`${ URL }registro/Post`, data, {});
  }

  getInfoPeriodos( rut: string,  _token: string ){
    const data = { token: _token, rut };
    return this.http.post<any>(`${ URL }periodos/Post`, data);
  }

  getInfoPeriodosNative( rut: string,  _token: string ){
    const data = { token: _token, rut };
    return this.nativeHttp.post(`${ URL }periodos/Post`, data, {});
  }

  getInfoUtilizados( rut: string,  _token: string ){
    const data = { token: _token, rut };
    return this.http.post<any>(`${ URL }utilizados/Post`, data);
  }

  getInfoUtilizadosNative( rut: string,  _token: string ){
    const data = { token: _token, rut };
    return this.nativeHttp.post(`${ URL }utilizados/Post`, data, {});
  }

  getInfoCtaCorriente( rut: string,  _token: string ){
    const data = { token: _token, rut };
    return this.http.post<any>(`${ URL }ctaCorriente/Post`, data);
  }

  getInfoCtaCorrienteNative( rut: string,  _token: string ){
    const data = { token: _token, rut };
    return this.nativeHttp.post(`${ URL }ctaCorriente/Post`, data, {});
  }

  sendSolicitudPermiso( dataSolicitud: any,  _token: string ){
    const data = { token: _token, rut: dataSolicitud.rut, fecha1: dataSolicitud.fecha1, fecha2: dataSolicitud.fecha2, hora1:dataSolicitud.hora1, hora2:dataSolicitud.hora2, motivo: dataSolicitud.motivo };
    return this.http.post<any>(`${ URL }permiso/Post`, data);
  }

  sendSolicitudPermisoNative( dataSolicitud: any,  _token: string ){
    const data = { token: _token, rut: dataSolicitud.rut, fecha1: dataSolicitud.fecha1, fecha2: dataSolicitud.fecha2, hora1:dataSolicitud.hora1, hora2:dataSolicitud.hora2, motivo: dataSolicitud.motivo };
    return this.nativeHttp.post(`${ URL }permiso/Post`, data, {});
  }

  getInfoPermisos( dataFind: any,  _token: string ){
    const data = { token: _token, rut: dataFind.rut, fecha1: dataFind.fecha1, fecha2: dataFind.fecha2 };
    return this.http.post<any>(`${ URL }consulta/Post`, data);
  }

  getInfoPermisosNative( dataFind: any,  _token: string ){
    const data = { token: _token, rut: dataFind.rut, fecha1: dataFind.fecha1, fecha2: dataFind.fecha2 };
    return this.nativeHttp.post(`${ URL }consulta/Post`, data, {});
  }

  getInfoLicenciaMedica( dataFind: any,  _token: string ){
    const data = { token: _token, rut: dataFind.rut, fecha1: dataFind.fecha1, fecha2: dataFind.fecha2 };
    return this.http.post<any>(`${ URL }licencia/Post`, data);
  }

  getInfoLicenciaMedicaNative( dataFind: any,  _token: string ){
    const data = { token: _token, rut: dataFind.rut, fecha1: dataFind.fecha1, fecha2: dataFind.fecha2 };
    return this.nativeHttp.post(`${ URL }licencia/Post`, data, {});
  }

  getInfoDocumentacion( dataFind: any,  _token: string ){
    const data = { token: _token, rut: dataFind.rut, tipo: dataFind.tipo };
    return this.http.post<any>(`${ URL }documentos/Post`, data);
  }

  getInfoDocumentacionNative( dataFind: any,  _token: string ){
    const data = { token: _token, rut: dataFind.rut, fecha1: dataFind.tipo };
    return this.nativeHttp.post(`${ URL }documentos/Post`, data, {});
  }

  getNotificaciones( rut: string,  _token: string ){
    const data = { token: _token, rut };
    return this.http.post<any>(`${ URL }notifica/Post`, data);
  }

  getNotificacionesNative( rut: string,  _token: string ){
    const data = { token: _token, rut };
    return this.nativeHttp.post(`${ URL }notifica/Post`, data, {});
  }

  sendSolicitudVacaciones( dataSolicitud: any,  _token: string ){
    const data = { token: _token, rut: dataSolicitud.rut, fecha1: dataSolicitud.fecha1, fecha2: dataSolicitud.fecha2 };
    return this.http.post<any>(`${ URL }vacacion/Post`, data);
  }

  sendSolicitudVacacionesNative( dataSolicitud: any,  _token: string ){
    const data = { token: _token, rut: dataSolicitud.rut, fecha1: dataSolicitud.fecha1, fecha2: dataSolicitud.fecha2 };
    return this.nativeHttp.post(`${ URL }vacacion/Post`, data, {});
  }

  confirmSolicitud( rut: string, idsol: any,  _token: string ){
    const data = { token: _token, rut, idsol };
    return this.http.post<any>(`${ URL }confirma/Post`, data);
  }

  confirmSolicitudNative( rut: string, idsol: any,  _token: string ){
    const data = { token: _token, rut, idsol };
    return this.nativeHttp.post(`${ URL }confirma/Post`, data, {});
  }

  sendSolicitudCompensacion( rut: string, dias: number,  _token: string ){
    const data = { token: _token, rut, dias };
    return this.http.post<any>(`${ URL }compensacion/Post`, data);
  }

  sendSolicitudCompensacionNative( rut: string, dias: number,  _token: string ){
    const data = { token: _token, rut, dias };
    return this.nativeHttp.post(`${ URL }compensacion/Post`, data, {});
  }

  pendientesFirma(_rut: string, _token: string){
    const data = { token: _token, rut: _rut };
    return this.http.post<any>(`${ URL }faltaFirma/Post`, data);
  }

  pendientesFirmaNative(_rut: string, _token: string){
    const data = { token: _token, rut: _rut };
    return this.nativeHttp.post(`${ URL }faltaFirma/Post`, data, {});
  }

  showDocument(_rut: string, _token: string, _tabla: string, _id: number){
    const data = { token: _token, rut: _rut, tabla: _tabla, id: _id };
    return this.http.post<any>(`${ URL }muestradocumento/Post`, data);
  }

  showDocumentNative(_rut: string, _token: string, _tabla: string, _id: number){
    const data = { token: _token, rut: _rut, tabla: _tabla, id: _id };
    return this.nativeHttp.post(`${ URL }muestradocumento/Post`, data, {});
  }

  firmarDocument(_rut: string, _token: string, _tabla: string, _id: number){
    const data = { token: _token, rut: _rut, tabla: _tabla, id: _id };
    console.log(data);
    return this.http.post<any>(`${ URL }firmatrabajador/Post`, data);
  }

  firmarDocumentNative(_rut: string, _token: string, _tabla: string, _id: number){
    const data = { token: _token, rut: _rut, tabla: _tabla, id: _id };
    return this.nativeHttp.post(`${ URL }firmatrabajador/Post`, data, {});
  }
}
