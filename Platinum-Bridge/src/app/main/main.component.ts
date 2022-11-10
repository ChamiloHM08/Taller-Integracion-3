import { Component, OnInit, ɵɵpureFunction1 } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppComponent } from '../app.component';
import { RestService } from '../rest.service';
import { Database, get, ref, getDatabase, child} from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { MatPseudoCheckbox } from '@angular/material/core';

let map: google.maps.Map;
let marker: google.maps.Marker;
let geocoder: google.maps.Geocoder;
let responseDiv: HTMLDivElement;
let response: HTMLElement;

//Geolocalización por consola
if ( navigator.geolocation ) {
  navigator.geolocation.getCurrentPosition(console.log)
}

declare var funcion1:any;
declare var funcion2:any;
declare var funcion3:any;
declare var funcion4:any;

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
  onClick3(){
    funcion3();
  }
  onClick4(){
    funcion4();
  }
  
  constructor( 
    private Rest: RestService,
    private http: HttpClient,) { }


  ngOnInit(): void {
    this.initMap(); 
    
  }

  SendPubl(value: any){
    this.Rest.SendPublic(value);
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
        mapTypeControl: false,
      }
    );

    //--------------- Geocode por medio de direcciones ------------------
    geocoder = new google.maps.Geocoder();
    const inputText = document.createElement("input")

    inputText.type = "text";
    inputText.placeholder = "Prueba de locación";

    const submitButton = document.createElement("input");
    submitButton.type = "button";
    submitButton.value = "Geocode";
    submitButton.classList.add("button", "button_primary");

    const clearButton = document.createElement("input");
    clearButton.type = "button";
    clearButton.value = "Limpiar";
    clearButton.classList.add("button", "button-secondary");

    response = document.createElement("pre");
    response.id = "response";
    response.innerText = "";

    responseDiv = document.createElement("div");
    responseDiv.id = "response-container";
    responseDiv.appendChild(response);

    const instructionsElement = document.createElement("p");

    instructionsElement.id = "instructions";

    instructionsElement.innerHTML =
    "<strong>Instrucciones</strong>: Ingresa una direccion en la caja de texto de geocode.";

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);

    //-------------------------------
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

      let date: Date = new Date()
      const infowindow = new google.maps.InfoWindow({
        content: '<div id="content">' +
        '<div id="siteNote">' +
        "</div>" +
        "<img src='https://cdn-icons-png.flaticon.com/512/616/616408.png' width='80' height='80'>" +
        '<h1 id="firstHeading" class="firstHeading">Solicitud de Trabajo: Paseo de mascotas</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Nombre: </b>Juan Pérez <br/>" +
        "<b>Fecha de publicación: </b>" + String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear() + "<br/>" +
        "<b>Descripción: </b>Se busca persona para pasear a mis perros por el simple motivo de que me fracturé el tobillo<br/>" +
        "<b>Lugar: </b> Calle pinito feliz 123 " + marker.getPosition() + "<br/>" +
        "<b>Monto: </b>$10.000</p>" +
        "<p><a href='javascript:location.reload()'>Ver más datos aquí</a></p>" +
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


