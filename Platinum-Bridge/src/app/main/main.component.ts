import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppComponent } from '../app.component';
import { RestService } from '../rest.service';
import { Database, get, ref, getDatabase, child} from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  dbRef = ref(getDatabase());
  options: google.maps.MapOptions = {
  center: {lat: -38.737621, lng: -72.588965},
  zoom: 15
};

  usuarios = "";
  a = "";
 
  
  constructor( 
    private RestService: RestService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.cargardata();  
  }



  public cargardata() {
    get(child(this.dbRef,"users/300")).then((snapshot) => {
     this.usuarios = snapshot.val();
     this.a = this.usuarios.toString();
      console.log(this.a.toString());
    })
  } 


}


