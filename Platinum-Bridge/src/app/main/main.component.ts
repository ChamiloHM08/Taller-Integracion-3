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
         
          console.log("La clave es " + clave+ " y el valor es " + this.Publ[clave].Detalles);

          new google.maps.Marker({
            position: { lat: this.Publ[clave].Ubicacion.Coord.x, lng: this.Publ[clave].Ubicacion.Coord.y },
            map:map,
          });

        }
      }
  
    });

  }

 
}