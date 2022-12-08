import { Component, OnInit } from '@angular/core';
import { Componente } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  componentes: Observable<Componente[]>;

  constructor(private dataServ: DataService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.componentes = this.dataServ.getMenuOpts();
    console.log(this.componentes);
  }

  navMarker(){
    this.navCtrl.navigateRoot('/marker');
  }

}
