import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class UbicacionService {

  constructor(private geolocalizacion: Geolocation) {
    console.log('Hello UbicacionProvider Provider');
  }

  iniciar_localizacion(){
    let watch = this.geolocalizacion.watchPosition();
      watch.subscribe((data) => {
        console.log("Geolocalizacion: ",data);
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      });
  }
}
