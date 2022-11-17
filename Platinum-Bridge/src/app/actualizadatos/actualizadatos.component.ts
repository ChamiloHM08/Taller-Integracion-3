import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Servicios/rest.service';
import { Auth } from '@angular/fire/auth';
import { UserData } from 'src/Models';
import { UsersService } from 'src/app/Servicios/users.service';
import Swal from 'sweetalert2';

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
 
  ngOnInit(): void {
    this.Api.GetUserID(this.Auth.currentUser?.uid).subscribe((res: any) =>{
      try {
        this.UserData = res;
      
      } catch (error) {
        console.log(res.message)
      }
    });

  }

  actualizar(datos: any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Se guardarán los cambios',
        text: 'Está de acuerdo en actualizar sus cambios?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.Api.UpdateProfile(this.Auth.currentUser?.uid, datos);
          this.Api.GetUserID(this.Auth.currentUser?.uid).subscribe((res: any) =>{
            localStorage.setItem('user', JSON.stringify(res));
          });
          swalWithBootstrapButtons.fire({
            title: 'Guardado!',
            text: 'Sus cambios han sido guardados, se redirigirá a su perfil',
            icon: 'success',
            showConfirmButton: false,
            /* backdrop: `
              rgba(0,0,123,0.4)
              url("https://media.tenor.com/-AyTtMgs2mMAAAAj/nyan-cat-nyan.gif")
              left top
              no-repeat
            ` */
          })
          setTimeout(() => location.href="/profile", 2500)
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelado',
            text: 'Los cambios no se han aplicado',
            icon: 'error',
          })
        }
      })

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
