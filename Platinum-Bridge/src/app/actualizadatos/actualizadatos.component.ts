import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { MaterialModule } from '../material.module';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { UserData } from 'src/Models';
import { UsersService } from 'src/users.service';

@Component({
  selector: 'app-actualizadatos',
  templateUrl: './actualizadatos.component.html',
  styleUrls: ['./actualizadatos.component.css']
})
export class ActualizadatosComponent implements OnInit {

  UserData: UserData = {
    Nombre: '',
    Apellidos: '',
    Descripcion: '',
    Nacionalidad: '',
    Direccion: '',
    F_Nacimiento: '',
    Correo: '',
    Telefono: null,
    Preferencia_Empleo: '',
    Trabaja: '',
    Cargo: ''
  }

  constructor(private Auth: Auth, private Api: RestService, private Hola: UsersService) {

  }

  ngAfterViewInit() {
  
    this.Api.GetUserID(this.Auth.currentUser?.uid).subscribe((res: any) =>{
      try {
        this.UserData = res;
        console.log(this.UserData);
      } catch (error) {
        console.log(res.message)
      }
    });

  }  

  ngOnInit(): void {


  }

  actualizar(datos: any){
    this.Api.UpdateProfile(this.Auth.currentUser?.uid, datos);

  }

}
