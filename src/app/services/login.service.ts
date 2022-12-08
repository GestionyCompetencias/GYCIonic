import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { Device } from '@awesome-cordova-plugins/device/ngx';

const URL = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string;
  modo: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private httpNat: HTTP,
              private navCtrl: NavController,
              private storage: Storage,
              private device: Device) { }

  loginStandar(user: string, pass: string){
    const dispositivo = this.device.uuid;
    //const dispositivo = 'f7f1ed802463f6e2';
    const data = { Usuario: user, Contrasena: pass, ID_DISPOSITIVO: dispositivo };
    console.log(data, "Datos login");
    return this.http.post<any>(`${ URL }Access/Login`, data, this.httpOptions);
  }

  loginNative(user: string, pass: string){
    //this.pinnigSSL();
    const dispositivo = this.device.uuid;
    const data = { Usuario: user, Contrasena: pass, ID_DISPOSITIVO: dispositivo };
    return this.httpNat.post(`${ URL }Access/Login`, data, {});
  }

  loginQR(documento: string, fecha: string){
    const dispositivo = this.device.uuid;
    const data = { Rut: documento, FechaNacimiento: fecha, NumDocumento: documento, ID_DISPOSITIVO: dispositivo };
    return this.http.post<any>(`${ URL }Access/LoginQR`, data, this.httpOptions);
  }

  loginQRNative(documento: string, fecha: string){
    const dispositivo = this.device.uuid;
    const data = { Rut: documento, FechaNacimiento: fecha, NumDocumento: documento, ID_DISPOSITIVO: dispositivo };
    return this.httpNat.post(`${ URL }Access/LoginQR`, data, {});
  }

  changePass(datos: any, token: string)
  {
    const dispositivo = this.device.uuid;
    const data = { token, ID_DISPOSITIVO: dispositivo, lastPassword:  datos.old, newPassword:  datos.new };
    //const data = { token, ID_DISPOSITIVO: 'f7f1ed802463f6e2', lastPassword:  datos.old, newPassword:  datos.new };
    console.log(data);
    return this.http.post<any>(`${ URL }Options/ChangePassword`, data, this.httpOptions);
  }

  changePassNative(datos: any, token: string)
  {
    //this.pinnigSSL();
    const dispositivo = this.device.uuid;
    const data = { token, ID_DISPOSITIVO: dispositivo, lastPassword: datos.old, newPassword:  datos.new };
    return this.httpNat.post(`${ URL }Options/ChangePassword`, data, {});
  }

  async validateUser(): Promise<boolean>{
    this.storage.create();
    this.token = await this.storage.get('token') || null;

    return new Promise<boolean>(resolve => {
      if(this.token != null){
        console.log('Usuario con Sesion Iniciada');
        resolve(true);
      }else{
        console.log('El usuario debe iniciar sesion');
        this.navCtrl.navigateRoot('/login');
        resolve(false);
      }
    });
  }

  async validateGuest(): Promise<boolean>{
    this.storage.create();
    this.token = await this.storage.get('token') || null;
    this.modo = await this.storage.get('modo') || null;

    return new Promise<boolean>(resolve => {
      if(this.token == null){
        console.log('El usuario no a iniciado sesion');
        resolve(true);
      }else{
        console.log('Usuario con sesion iniciada');
        if (this.modo === 'INDIVIDUAL') {
          this.navCtrl.navigateRoot('/marker');
        } else {
          this.navCtrl.navigateRoot('/marker-colective');
        }
        resolve(false);
      }
    });
  }

  async logout(){
    this.storage.create();
    await this.storage.remove('log');
    await this.storage.remove('rut');
    await this.storage.remove('token');
    await this.storage.remove('modo');
    await this.storage.remove('idTrabajador');
    await this.storage.remove('rutEmpresa');
    await this.storage.remove('razonEmpresa');
    await this.storage.remove('direccion');
    await this.storage.remove('logo');
    await this.storage.remove('comuna');
    this.navCtrl.navigateRoot('/login');
  }
}