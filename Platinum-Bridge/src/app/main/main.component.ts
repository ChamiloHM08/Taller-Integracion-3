import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
options: google.maps.MapOptions = {
  center: {lat: -38.737621, lng: -72.588965},
  zoom: 15
};
  
  constructor() { }

  ngOnInit(): void {
  }

}
