import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PopUserComponent } from './pop-user/pop-user.component';
import { HeaderComponent } from './header/header.component';
import { NotifyComponent } from './notify/notify.component';



@NgModule({
  declarations: [
    MenuComponent,
    PopUserComponent,
    HeaderComponent,
    NotifyComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    PopUserComponent,
    HeaderComponent,
    NotifyComponent
  ]
})
export class ComponentsModule { }
