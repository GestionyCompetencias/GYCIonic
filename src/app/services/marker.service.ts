import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { Storage } from '@ionic/storage-angular';
import { Device } from '@awesome-cordova-plugins/device/ngx';

const URL = environment.urlApi;
const URL_IMG = environment.url_img;

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  token: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private httpNat: HTTP,
    private fileTransfer: FileTransfer,
    private storage: Storage,
    private device: Device) { }

  async sendMarker(marker: any){
    const dispositivo = this.device.uuid;
    //const dispositivo = 'f7f1ed802463f6e2';
    this.token = await this.storage.get('token') || null;
    const marcacion = marker.fecha+' '+marker.hora;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const data = {
      token: this.token,
      ID_DISPOSITIVO: dispositivo,
      MARCACION: marcacion,
      TIPO_MARCA: marker.tipo,
      LATITUD: marker.latitud,
      LONGITUD: marker.longitud,
      TIPO_VERIFICACION: marker.modo,
      TRABAJADOR: marker.trabajador,
      N_DOCUMENTO: marker.rut
    };

    console.log("Marcaje Enviado: ", data);
    

    return this.http.post<any>(`${ URL }Trabajadores/RegistraMarcacion`, data, this.httpOptions);
  }

  async sendMarkerNative(marker: any){
    const dispositivo = this.device.uuid;
    this.token = await this.storage.get('token') || null;
    const marcacion = marker.fecha+' '+marker.hora;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const data = {
      token: this.token,
      ID_DISPOSITIVO: dispositivo,
      MARCACION: marcacion,
      TIPO_MARCA: marker.tipo,
      LATITUD: marker.latitud,
      LONGITUD: marker.longitud,
      TIPO_VERIFICACION: marker.modo,
      TRABAJADOR: marker.trabajador,
      N_DOCUMENTO: marker.rut
    };
    return this.httpNat.post(`${ URL }Trabajadores/RegistraMarcacion`, data, {});
  }


  async uploadImages(image: string, IdMarcacion: any){

    this.token = await this.storage.get('token') || null;
    const dispositivo = this.device.uuid;
    //const dispositivo = 'f7f1ed802463f6e2';

    const options: FileUploadOptions = {
      fileKey: 'PICTURE',
      fileName: image.substring(image.lastIndexOf('/')+1),
      mimeType: 'image/jpeg',
      chunkedMode: false,
      params: {
        token: this.token,
        IdMarcacion,
        ID_DISPOSITIVO: dispositivo,
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(image, `${ URL_IMG }?token=${ this.token }&ID_DISPOSITIVO=${ dispositivo }&IdMarcacion=${ IdMarcacion }`, options).then( data => {
      console.log(data);
    }).catch( err =>{
      console.log('Error en carga: ', err);
    });
  }
}
