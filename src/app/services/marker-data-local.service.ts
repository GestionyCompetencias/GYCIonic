import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MarkerDataLocalService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;
  }

  async cargarMarkers()
  {
    const storage = await this.storage.create();
    let _markers: any[];
    // eslint-disable-next-line prefer-const
    _markers = await this.storage.get('markers') || [];
    return _markers;
  }

  async cargarMaker(marker: any)
  {

    const markers = await this.cargarMarkers();
    const index = markers.length + 1;
    const newMarker = {
      id: index,
      lat: marker.lat,
      lng: marker.lng,
      fecha: marker.fecha,
      hora: marker.hora,
      tipo: marker.tipo,
      rut: marker.rut,
      trabajador: marker.trabajador
    };

    const storage = await this.storage.create();
    markers.push(newMarker);
    this.storage.set('markers', markers);
  }

  async removeMarker(marker: any)
  {
    const storage = await this.storage.create();
    const markers = await this.cargarMarkers();
    for (let i =0; i < markers.length; i++){
      if (markers[i].id === marker.id) {
        markers.splice(i,1);
      }
    }
    this.storage.set('markers', markers);

  }
}
