import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../Servicios/rest.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from "sweetalert2"

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
    //console.log(this.marker)
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
 
    if(this.marker.getPosition()?.lat == null){
      Swal.fire({
        title: 'Ubicación sin especificar!',
        text: 'Le falta especificar ubicación en el mapa a la derecha',
        icon: 'error'
      })

    }else if(user.Usuario == ''){
      Swal.fire({
        title: 'Falta información!',
        text: 'Para completar su solicitud, por favor complete su perfil',
        icon: 'error'
      })

    }else{
      new google.maps.Geocoder().geocode({location: {lat: this.marker.getPosition()?.lat()!, lng: this.marker.getPosition()?.lng()!}}).then((response)=>{
        const Direccion = response.results[0].formatted_address; // Pais
        const Ubicacion = {Direccion: Direccion, Coord:{x: this.marker.getPosition()?.lat(), y:this.marker.getPosition()?.lng()}}
        this.Api.SendPublic(user, value, Ubicacion).subscribe((res: any) =>{
          if(res.message == 'Publicacion Creada'){
            Swal.fire({
              title: 'Publicación creada!',
              text: 'Su publicación ya se encuentra en la página principal',
              icon: 'success',
              showConfirmButton: false
            });
            setTimeout(() => location.href="/main", 2500)
          }else{
            Swal.fire({
              title: 'Algo salió mal :(',
              text: 'Ha ocurrido un problema al procesar su solicitud',
              icon: 'error'
            })
            console.log(res);
          }
        });
        
        
      });
    }
  } 
}
