import { Injectable } from '@angular/core';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private nativeAudio: NativeAudio) {
    this.preloadAudios();
  }

  preloadAudios(){
    this.nativeAudio.preloadComplex('exitoso', 'assets/audios/SD_ALERT_44.mp3', 1, 1, 0);
    this.nativeAudio.preloadComplex('fallido', 'assets/audios/SD_ALERT_29.mp3', 1, 1, 0);
  }

  playExitoso(volumen: number){
    this.nativeAudio.setVolumeForComplexAsset('exitoso', volumen).then((success)=>{
      console.log(success);
      this.nativeAudio.play('exitoso');
    });
  }

  playFallido(volumen: number){
    this.nativeAudio.setVolumeForComplexAsset('fallido', volumen).then((success)=>{
      console.log(success);
      this.nativeAudio.play('fallido');
    });
  }
}
