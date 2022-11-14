import { Component, OnInit, ɵɵpureFunction1 } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppComponent } from '../app.component';
import { RestService } from 'src/app/Servicios/rest.service';
import { Database, get, ref, getDatabase, child} from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { MatPseudoCheckbox } from '@angular/material/core';
import { Auth } from '@angular/fire/auth';

let map: google.maps.Map;
let responseDiv: HTMLDivElement;
let response: HTMLElement;


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
  dbRef = ref(getDatabase());

  options: google.maps.MapOptions = {
    center: {lat: -38.737621, lng: -72.588965},
    zoom: 15,
  };

  constructor( 
    private Rest: RestService,
    private http: HttpClient, private Auth: Auth) { }


  ngOnInit(): void {
  
    
  }

  SendPubl(value: any){
    this.Rest.SendPublic(this.Auth.currentUser?.uid, value);
  }

}