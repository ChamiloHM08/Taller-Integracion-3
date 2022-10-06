import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Database, set, ref } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private Auth: Auth, private Database: Database, private Router: Router) {}

  register({email, password}: any){
    return createUserWithEmailAndPassword(this.Auth, email, password).then(response => {

      set(ref(this.Database, 'users/' + this.Auth.currentUser?.uid),{
        Nombre: '',
        Descripcion: '',
        Nacionalidad: '',
        Direccion: '',
        F_Nacimiento: '',
        Correo: this.Auth.currentUser?.email,
        Telefono: '',
        Preferencia_Empleo: '',
        Trabaja: '',
        Cargo: ''
      });

      this.logout();
      console.log(response);
      this.Router.navigate(['/login']);
    })
    .catch(error => console.log(error));
  }

  login({email, password}: any){
    return signInWithEmailAndPassword(this.Auth, email, password)
    .then(response => {
      console.log(response);
      this.Router.navigate(['/main']);

    })
    .catch(error => console.log(error));;
  }

  loginGoogle(){
    return signInWithPopup(this.Auth, new GoogleAuthProvider())
    .then(response => {
      set(ref(this.Database, 'users/' + this.Auth.currentUser?.uid),{
        Nombre: '',
        Descripcion: '',
        Nacionalidad: '',
        Direccion: '',
        F_Nacimiento: '',
        Correo: this.Auth.currentUser?.email,
        Telefono: '',
        Preferencia_Empleo: '',
        Trabaja: '',
        Cargo: '',
      });
      this.pruebas();
      this.Router.navigate(['/main']);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  logout(){
    console.log(this.Auth)
    return signOut(this.Auth);
  }

  pruebas(){
      console.log(this.Auth.currentUser)
  }

}
