import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  //private baseUrl = environment.API_BASE_URL;
  private baseUrl = "https://us-central1-api-pb-f4131.cloudfunctions.net/app"
  constructor(private http: HttpClient) {}

  GetUsers(){
    return this.http.get(this.baseUrl+"/users");
  }

  GetUserID(Uid: any){
    return this.http.get(this.baseUrl+"/userID/"+Uid);
  }

  ExistsUserID(Uid: any){
    return this.http.get(this.baseUrl+"/existsuserID/"+Uid);
  }

  GetPublActivas(){
    return this.http.get(this.baseUrl+"/publ_Activa");
  }

  GetPublTerminadas(){
    return this.http.get(this.baseUrl+"/publ_Terminadas");
  }

  // --------------- METODOS POST ------------------// 

  UpdateProfile({Uid, Value}: any){
    this.http.post(this.baseUrl+"/Update_Profile/"+Uid, Value).subscribe((res: any)=>{
      console.log(res);
    })
  }

  // Recordatorio: COLOCA EL NICKNAME 
  CreateDatabase(Uid: any , Nombre: any, Apellido: any, Email: any){
    const data = {Nombre: Nombre, Apellido: Apellido, Email: Email}
    this.http.post(this.baseUrl+"/Create_Database/"+Uid, data).subscribe((res: any)=>{
      console.log(res);
    })
  }


}
