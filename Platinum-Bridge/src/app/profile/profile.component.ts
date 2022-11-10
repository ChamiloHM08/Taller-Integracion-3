import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/Models';
import { UsersService } from 'src/users.service';
import { RestService } from '../rest.service';
import { Auth } from '@angular/fire/auth';
import Swal from 'sweetalert2';

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
    Telefono: null,
    Preferencia_Empleo: '',
    Trabaja: '',
    Cargo: ''
  }

  constructor(private UsersService: UsersService, private Api: RestService, private Auth: Auth) { }

  ngOnInit(): void {

    this.Api.GetUserID(this.Auth.currentUser?.uid).subscribe((res: any) =>{
      try {
        this.UserData = res;
      } catch (error) {
        console.log(res.message)
      }
    });

  }

  foto(){
    var foto = this.UsersService.pruebas()
    if(foto == null){
      return "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"

    }else{
      return foto

    }
    
  }

  EditarProfile(value: any){
    console.log(value);
    this.UsersService.UpdateProfile(value);

  }

  showModal(){
    Swal.fire('Cambios exitosos','Su perfil ha sido actualizado!','success');
  }

}
