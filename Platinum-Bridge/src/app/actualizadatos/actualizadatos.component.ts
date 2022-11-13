import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Servicios/rest.service';
import { Auth } from '@angular/fire/auth';
import { UserData } from 'src/Models';
import { UsersService } from 'src/app/Servicios/users.service';

@Component({
  selector: 'app-actualizadatos',
  templateUrl: './actualizadatos.component.html',
  styleUrls: ['./actualizadatos.component.css']
})
export class ActualizadatosComponent implements OnInit {

  UserData: UserData = {
    Nombre: '',
    Usuario: '',
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

  constructor(private Auth: Auth, private Api: RestService, private UsersService: UsersService) {

  }

  ngAfterViewInit() {
    console.log(this.Auth.currentUser?.uid);
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

  foto(){
    var foto = this.UsersService.UrlFoto()
    if(foto == null){
      return "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"

    }else{
      return foto

    }
    
  }

}
