import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../Servicios/rest.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-generar-oferta',
  templateUrl: './generar-oferta.component.html',
  styleUrls: ['./generar-oferta.component.css']
})
export class GenerarOfertaComponent implements OnInit {


  constructor(private Api: RestService, private Auth: Auth, private Router: Router) { }
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
    console.log(this.marker)
    // Obtener la posicion del marcador - console.log(this.marker.getPosition()?.lat())
    this.marker = new google.maps.Marker({
      position: latLng,
      map:map,
    });
    
    // Elimna un marcador NewMarker.setMap(null);
    
    map.panTo(latLng);
  }
  

  SendP(value: any){
    const user = JSON.parse(localStorage.getItem("user")!);
    const Ubicacion = {Ciudad: "Temuco", Comuna: "Temuco", Coord:{x: this.marker.getPosition()?.lat(), y:this.marker.getPosition()?.lng()}}

    if(this.marker.getPosition()?.lat == null){
      return alert("Debes colocar una ubicacion en el mapa")

    }else if(user.Usuario == ''){
      return alert("Antes de hacer una publicacion debes completar tu informacion de usuario")

    }else{
      this.Api.SendPublic(user, value, Ubicacion);
      alert("Oferta Generada")
      this.Router.navigate(['/main']).then(() => {
        window.location.reload();
      });;
    }

  }
 


}
