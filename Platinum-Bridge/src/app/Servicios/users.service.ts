import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  // Este archivo se encarga de todas las funcionalidades de logeo y acceso de los usuarios

  constructor(private Auth: Auth, private Router: Router, private Api: RestService){}

  // Funcion para registrar y autenticar a un nuevo usuario, Ademas de generar una base de datos para su informacion 
  register(value: any){
    return createUserWithEmailAndPassword(this.Auth, value.email, value.password).then(response => {   
      this.Api.CreateDatabase(this.Auth.currentUser?.uid, value.nombres, value.apellidos, this.Auth.currentUser?.email);
      this.logout();
      this.Router.navigate(['/login']);

    })
    .catch(error => { // Errores tras cualquier error de registro
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('La contraseña es demasiado debil.');
      
      }else if(errorCode == 'auth/email-already-in-use'){
        alert('El correo ingresado ya esta en uso.')

      }else if(errorCode == 'auth/invalid-email'){
        alert('El correo ingresado no es valido.')
      }else{
        alert(errorMessage);
      }
    });
  }

  // 
  login({email, password}: any){
    return signInWithEmailAndPassword(this.Auth, email, password)
    .then(response => {
      this.Api.GetUserID(this.Auth.currentUser?.uid).subscribe((res: any) =>{
        localStorage.setItem('user', JSON.stringify(res));
        console.log(localStorage.getItem("user"))
      });
      //console.log(response);
      this.Router.navigate(['/main']);

    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/wrong-password') {
        alert('La contraseña es incorrecta.');
      
      }else if(errorCode == 'auth/user-not-found'){
        alert('El usuario ingresado no existe.')

      }else if(errorCode == 'auth/invalid-email'){
        alert('El correo ingresado no es valido.')
      }else{
        alert(errorMessage);
      }
    });
  }

  loginGoogle(){
    return signInWithPopup(this.Auth, new GoogleAuthProvider()).then(response => {
      this.Api.ExistsUserID(this.Auth.currentUser?.uid).subscribe(res =>{
        if(!res){
          this.Api.CreateDatabase(this.Auth.currentUser?.uid, this.Auth.currentUser?.displayName, "", this.Auth.currentUser?.email);
        }
      })    
      this.Api.GetUserID(this.Auth.currentUser?.uid).subscribe((res: any) =>{
        localStorage.setItem('user', JSON.stringify(res));
        console.log(localStorage.getItem("user"))
      });
      this.Router.navigate(['/main']);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  logout(){
    localStorage.removeItem("user");
    return signOut(this.Auth);
  }

  UrlFoto(){
    return this.Auth.currentUser?.photoURL;
  }

}
