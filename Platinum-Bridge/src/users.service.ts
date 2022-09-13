import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private Auth: Auth) { }

  register({email, password}: any){
    return createUserWithEmailAndPassword(this.Auth, email, password);
  }

  login({email, password}: any){
    return signInWithEmailAndPassword(this.Auth, email, password);
  }

  loginGoogle(){
    return signInWithPopup(this.Auth, new GoogleAuthProvider());
  }

  logout(){
    console.log(this.Auth)
    return signOut(this.Auth);
  }

}
