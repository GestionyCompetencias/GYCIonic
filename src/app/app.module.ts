import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from "@ionic/storage-angular";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner/ngx";
import { CameraPreview } from '@awesome-cordova-plugins/camera-preview/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { FileOpener } from "@awesome-cordova-plugins/file-opener/ngx";
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ComponentsModule } from './components/components.module';
import { DocumentViewer } from "@awesome-cordova-plugins/document-viewer/ngx";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ComponentsModule,
  ],
  providers: [
    BarcodeScanner,
    CameraPreview,
    Device,
    Diagnostic,
    File,
    FileTransfer,
    FileOpener,
    NativeAudio,
    DocumentViewer,
    Network,
    HttpClient,
    HTTP,
    Geolocation,
    ScreenOrientation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
