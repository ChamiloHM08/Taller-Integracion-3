import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getDatabase, Database, set, ref, onValue, get, child } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  
  constructor(private Auth: Auth, private Database: Database, private Router: Router){}


  ObtenerDatos(){
    const dbRef = ref(getDatabase());
 
    onValue(ref(this.Database, `users/${this.Auth.currentUser?.uid}`), (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });

    // get(child(dbRef, `users/${this.Auth.currentUser?.uid}`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    //   }).catch((error) => {
    //     console.error(error);
    //   });

  }

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
      this.pruebas();
      this.Router.navigate(['/main']);

    })
    .catch(error => console.log(error));
  }

  loginGoogle(){
    return signInWithPopup(this.Auth, new GoogleAuthProvider())
    .then(_response => {
      
      //Cambiar esto, con condicion de si existe o no existe
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
      }); //
      
      this.Router.navigate(['/main']);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  logout(){
    console.log(this.Auth);
    return signOut(this.Auth);
  }

  pruebas(){
      this.ObtenerDatos();
  }

}
