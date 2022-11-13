import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  //private baseUrl = environment.API_BASE_URL;
  private baseUrl = "https://us-central1-api-pb-f4131.cloudfunctions.net/app"
  constructor(private http: HttpClient, private Auth: Auth) {}

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

  UpdateProfile(Uid: any, Value: any){
    try{
    
      const data = {Usuario: Value.usuario,
        Nombre: Value.nombres,
        Apellidos: Value.apellidos,
        Descripcion: Value.descripcion,
        Nacionalidad: Value.nacionalidad,
        Direccion: Value.direccion,
        F_Nacimiento: '',  
        Telefono: Value.telefono,
        Trabaja: Value.trabajo,
      } 

      this.http.post(this.baseUrl+"/Update_Profile/"+Uid, data).subscribe((res: any)=>{
        console.log(res);
      })

    }catch(error){
      console.log(error);
    }
  }

  // Recordatorio: COLOCA EL NICKNAME 
  CreateDatabase(Uid: any , Nombre: any, Apellido: any, Email: any){
    const data = {Nombre: Nombre, Apellido: Apellido, Email: Email}
    this.http.post(this.baseUrl+"/Create_Database/"+Uid, data).subscribe((res: any)=>{
      console.log(res);
    })
  }

  SendPublic(Uid: any, Datos: any){
    const data = {NickName: "", 
      UidUser: Uid,
      Titulo: Datos.titulo,
      Detalles: Datos.detalles,
      Fecha: "",
      Monto: Datos.monto,
      Ubicacion: ""}

    this.http.post(this.baseUrl+"/Send_Public", data).subscribe((res: any)=>{
      console.log(res);
    })
  }


}
