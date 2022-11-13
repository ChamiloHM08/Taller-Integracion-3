import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, User, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getDatabase, Database, set, ref, onValue, get, child, update } from '@angular/fire/database';
import { RestService } from 'src/app/Servicios/rest.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  dbRef = ref(getDatabase());

  constructor(private Auth: Auth, private Database: Database, private Router: Router, private Api: RestService){}

  ObtenerDatos(){
    return get(child(this.dbRef, `users/${this.Auth.currentUser?.uid}`))
  }

  register(value: any){
    return createUserWithEmailAndPassword(this.Auth, value.email, value.password).then(response => {
     
      this.Api.CreateDatabase(this.Auth.currentUser?.uid, value.nombres, value.apellidos, this.Auth.currentUser?.email);

      this.logout();
      //console.log(response);
      this.Router.navigate(['/login']);
    })
    .catch(error => console.log(error));
  }

  login({email, password}: any){
    return signInWithEmailAndPassword(this.Auth, email, password)
    .then(response => {
      //console.log(response);
      this.Router.navigate(['/main']);

    })
    .catch(error => console.log(error));
  }

  loginGoogle(){
    return signInWithPopup(this.Auth, new GoogleAuthProvider()).then(response => {
      this.Api.ExistsUserID(this.Auth.currentUser?.uid).subscribe(res =>{
        if(!res){
          this.Api.CreateDatabase(this.Auth.currentUser?.uid, this.Auth.currentUser?.displayName, "", this.Auth.currentUser?.email);
        }
      })    
      this.Router.navigate(['/main']);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  UpdateProfile(value: any){

    return update(ref(this.Database, 'users/' + this.Auth.currentUser?.uid),{
      //Nombre: value.Nombre,
      //Descripcion: value.Descripcion,
      Nacionalidad: value.Nacionalidad,
      Direccion: value.Direccion,
      F_Nacimiento: value.F_Nacimiento,
      Correo: value.Correo,
      Telefono: value.Telefono,
      Preferencia_Empleo: value.Preferencia_Empleo,
      Trabaja: value.Trabaja,
      Cargo: value.Cargo
    }); 

  }

  logout(){
    //console.log(this.Auth);
    return signOut(this.Auth);
  }

  UrlFoto(){
    return this.Auth.currentUser?.photoURL;
  }

}
