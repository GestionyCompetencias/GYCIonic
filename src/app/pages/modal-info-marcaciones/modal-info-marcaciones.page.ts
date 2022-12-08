import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalMapsPage } from '../modal-maps/modal-maps.page';

const API_KEY = environment.mapsbox.api_key;

// eslint-disable-next-line no-var
declare var mapboxgl: any;

@Component({
  selector: 'app-modal-info-marcaciones',
  templateUrl: './modal-info-marcaciones.page.html',
  styleUrls: ['./modal-info-marcaciones.page.scss'],
})
export class ModalInfoMarcacionesPage implements OnInit {

  @Input() RUT: string;
  @Input() NOMBRE: string;
  @Input() FECHA: string;
  @Input() CARGO: string;
  @Input() COORDENADA: string;
  @Input() HHEE: string;
  @Input() HORA: string;
  @Input() MARCACION: string;
  @Input() MODIFICADA: string;
  @Input() TIPO: string;

  coordenadas:boolean;

  lng: any;
  lat: any;
  mapa: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if(this.COORDENADA !== 'X'){
      const coordenadas = this.COORDENADA.split(',');
      this.lng = coordenadas[1];
      this.lat = coordenadas[0];
      this.buildMap();
      this.coordenadas = true;
    }else{
      this.coordenadas = false;
    }
    this.mostrarItemMap();
  }

  mostrarItemMap(){
    console.log(this.coordenadas);
    
    let item_map = document.getElementById('coordenada-map');
    let item = document.getElementById('coordenada');
    if(!this.coordenadas){
      item_map.style.display="block";
      item.style.display="none";
    }else{
      item_map.style.display="none";
      item.style.display="block";
    }
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  buildMap(){
    const lat = Number(this.lat);
    const lng = Number(this.lng);

    console.log(lat, lng);

    mapboxgl.accessToken = API_KEY;
    this.mapa = new mapboxgl.Map({
      container: 'minimap', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [lng, lat], // starting position
      zoom: 17 // starting zoom
    });

    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(this.mapa);
  }

  async openMap( coords ){

    const coordenadas = coords.split(',');
    const lng = coordenadas[1];
    const lat = coordenadas[0];

    const modal = await this.modalCtrl.create({
      component: ModalMapsPage,
      componentProps: {
        lat,
        lng
      }
    });

    await modal.present();
  }

}
