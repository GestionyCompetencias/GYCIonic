import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment.prod';

const API_KEY = environment.mapsbox.api_key;

// eslint-disable-next-line no-var
declare var mapboxgl: any;

@Component({
  selector: 'app-modal-maps',
  templateUrl: './modal-maps.page.html',
  styleUrls: ['./modal-maps.page.scss'],
})
export class ModalMapsPage implements OnInit {

  mapa: any;

  @Input() lat: any;
  @Input() lng: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  buildMap(){
    const lat = Number(this.lat);
    const lng = Number(this.lng);

    mapboxgl.accessToken = API_KEY;
    this.mapa = new mapboxgl.Map({
      container: 'mapa-mapsbox', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [lng, lat], // starting position
      zoom: 17 // starting zoom
    });

    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(this.mapa);

    // Add zoom and rotation controls to the map.
    this.mapa.addControl(new mapboxgl.NavigationControl());
  }

  ionViewDidEnter() {
    this.buildMap();
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
