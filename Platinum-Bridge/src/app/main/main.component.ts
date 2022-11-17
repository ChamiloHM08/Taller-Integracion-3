import { Component, OnInit, ɵɵpureFunction1 } from '@angular/core';
import { RestService } from '../Servicios/rest.service';
import { UsersService } from '../Servicios/users.service';


//Geolocalización por consola
if ( navigator.geolocation ) {
  navigator.geolocation.getCurrentPosition(console.log)
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  
  Publ: any;

  constructor(private Api: RestService) { 
    
  }

  ngOnInit() {
    this.initMap();
  

  }

  initMap() {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 15,
        center: { lat: -38.737621, lng: -72.588965 },
      }
    );

    this.Api.GetPublActivas().subscribe((res: any)=>{
      this.Publ = res;
      for (var clave in this.Publ){
        if (this.Publ.hasOwnProperty(clave)) {
          
          var content1 = '<div id="contentMap" ><FONT COLOR="black">' +
          //"<img src='https://cdn-icons-png.flaticon.com/512/616/616408.png' width='80' height='80'>" +
          '<h1 id="firstHeading" class="firstHeading"><FONT COLOR="red"> Solicitud de Trabajo: '+ this.Publ[clave].Titulo +'</FONT></h1>' +
          '<div id="bodyContent">' +
          "<p><b>Nombre: </b> "+ this.Publ[clave].NickName +
          "<div id='Detalles' style='display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;'>"+
          "<p><b>Descripción:</b>"+this.Publ[clave].Detalles +"</p><br/>" +
          "</div>"+
          "<p><b>Vacantes: </b>"+ this.Publ[clave].Vacantes+"<br/>" +
          "<b>Fecha de publicación: </b> "+ this.Publ[clave].Fecha +"  <br/>" +
          "<b>Lugar: </b> "+ this.Publ[clave].Ubicacion.Direccion+"<br/>" +
          "<b>Monto: </b>$"+this.Publ[clave].Monto+"</p>" +
          "<p><a href='/publicacion/"+[clave]+"'>Ver más datos aquí</a></p>" +
          "</div>" +
          "</FONT></div>";
      
          //console.log("La clave es " + clave+ " y el valor es " + this.Publ[clave].Detalles);

          const infoWindow = new google.maps.InfoWindow({
            content: content1
          });

          const marker = new google.maps.Marker({
            position: { lat: this.Publ[clave].Ubicacion.Coord.x, lng: this.Publ[clave].Ubicacion.Coord.y },
            map: map,
          });

          marker.addListener("click", () => {
            infoWindow.open(marker.getMap(), marker);

          });

          
        }
      }
  
    });

  }

 
}