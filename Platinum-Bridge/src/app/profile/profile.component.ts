import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/Models';
import { UsersService } from 'src/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  UserData: UserData = {
    Nombre: '',
    Apellidos: '',
    Descripcion: '',
    Nacionalidad: '',
    Direccion: '',
    F_Nacimiento: '',
    Correo: '',
    Telefono: 0,
    Preferencia_Empleo: '',
    Trabaja: '',
    Cargo: ''
  }

  constructor(private UsersService: UsersService) { }

  ngOnInit(): void {
    this.UsersService.ObtenerDatos().then((snapshot) => {
      if (snapshot.exists()) {

        this.UserData.Nombre = snapshot.val().Nombre;
        this.UserData.Apellidos = snapshot.val().Apellidos;
        this.UserData.Descripcion = snapshot.val().Descripcion;
        this.UserData.Nacionalidad = snapshot.val().Nacionalidad;
        this.UserData.Direccion = snapshot.val().Direccion;
        this.UserData.F_Nacimiento = snapshot.val().F_Nacimiento;
        this.UserData.Correo = snapshot.val().Correo;
        this.UserData.Telefono = snapshot.val().Telefono;
        this.UserData.Preferencia_Empleo = snapshot.val().Preferencia_Empleo;
        this.UserData.Trabaja = snapshot.val().Trabaja;
        this.UserData.Cargo = snapshot.val().Cargo;

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

}
