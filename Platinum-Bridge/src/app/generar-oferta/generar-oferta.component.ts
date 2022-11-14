import { Component, OnInit, ViewChild } from '@angular/core';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-generar-oferta',
  templateUrl: './generar-oferta.component.html',
  styleUrls: ['./generar-oferta.component.css']
})
export class GenerarOfertaComponent implements OnInit {

  

  constructor() { }
  ngOnInit(){
    this.initMap();
  }
  
  marker = new google.maps.Marker({});

  initMap() {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 15,
        center: { lat: -38.737621, lng: -72.588965 },
      }
    );
  
    map.addListener("click", (e: any) => {
      this.marker.setMap(null);
      this.placeMarkerAndPanTo(e.latLng, map);
    });
  }
  
  placeMarkerAndPanTo(latLng: google.maps.LatLng, map: google.maps.Map) {
    // Con esto se obtienen las lat, lng de el punto - console.log(latLng.lat(), latLng.lng())
   
    // Obtener la posicion del marcador - console.log(this.marker.getPosition()?.lat())
    this.marker = new google.maps.Marker({
      position: latLng,
      map:map,
    });
    
    // Elimna un marcador NewMarker.setMap(null);
    
    map.panTo(latLng);
  }
  
 


}
