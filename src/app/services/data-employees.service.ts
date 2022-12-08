import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';

const URL = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class DataEmployeesService {

  constructor(private http: HttpClient,
    private httpNat: HTTP,
    private device: Device) { }

  getTrabajadores(token: string) {
    const dispositivo = this.device.uuid;
    const data = { token, ID_DISPOSITIVO: dispositivo };
    return this.http.post<any>(`${ URL }Trabajadores/GetTrabajadores`, data);
  }

  getTrabajadoresNat(token: string) {
    const dispositivo = this.device.uuid;
    const data = { token, ID_DISPOSITIVO: dispositivo };
    return this.httpNat.post(`${ URL }Trabajadores/GetTrabajadores`, data, {});
  }
}
