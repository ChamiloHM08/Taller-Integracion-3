import { Component, OnInit, ɵɵpureFunction1 } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppComponent } from '../app.component';
import { RestService } from '../rest.service';
import { Database, get, ref, getDatabase, child} from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { MatPseudoCheckbox } from '@angular/material/core';

declare var funcion1:any;
declare var funcion2:any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  dbRef = ref(getDatabase());

  usuarios = "";
  a = "";
  onClick1(){
    funcion1();
  }
  onClick2(){
    funcion2();
  }
  
  constructor( 
    private RestService: RestService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.initMap(); 
    
  }

  public initMap(): void {
    const miLatLng_1 = {lat: -38.735621, lng: -72.588965}; //Marcador 1
    const miLatLng_2 = {lat: -38.738621, lng: -72.588965}; //Marcador 2
    const miLatLng_3 = {lat: -38.731621, lng: -72.582965}; //Marcador 3
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 15,
        center: {lat: -38.737621, lng: -72.588965}, //Ruta base 
      }
    );

    const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

    const bandera = new google.maps.Marker({
      position: miLatLng_2,
      map,
      icon: image,
    })

    function prueba(){

      const marker = new google.maps.Marker({
        position: {lat: -38.732861, lng: -72.581267},
        map: map,
        icon: image,
      })

      const infowindow = new google.maps.InfoWindow({
        content: '<div id="content">' +
        '<div id="siteNote">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Solicitud de Trabajo: Paseo Mascotas</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Se solicita trabajo</b>, freelance para paseo de mascotas entre las calles " +
        "Francisco Bilbao y Zenteno, favor ponerse en contacto.</p>" +
        "<p>Locación:" + marker.getPosition() + "</p>" +
        "</div>" +
        "</div>",
      })

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        })
      })

      google.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker)
      })
    }

    //Generar de marcador con solicitud
    var generar = prueba();

    new google.maps.Marker({
      position: miLatLng_3,
      map,
      icon: image,
    })

    new google.maps.Marker({
      position: miLatLng_1, 
      map, 
      icon: image,
      title: "Prueba marcador",
    });
  }

  
  
}


