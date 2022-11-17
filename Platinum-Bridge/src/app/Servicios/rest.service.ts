import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  // Este es un servicio que se encarga de mantener comunicacion con la API 

  private baseUrl = "https://us-central1-api-pb-f4131.cloudfunctions.net/app"
  constructor(private http: HttpClient, private Auth: Auth) {}

  // Obtiene los datos de todos los usuarios de la base de datos 
  GetUsers(){
    return this.http.get(this.baseUrl+"/users");
  }

  // Obtiene a un usuario por su Identificacion 
  GetUserID(Uid: any){
    return this.http.get(this.baseUrl+"/userID/"+Uid);
  }

  // Verifica si un usuario ya existe
  ExistsUserID(Uid: any){
    return this.http.get(this.baseUrl+"/existsuserID/"+Uid);
  }

  // Obtiene una publicacion por su Identificacion 
  GetPubl(Uid: any){
    return this.http.get(this.baseUrl+"/publ_ID/"+Uid);
  }

  // Obtiene todas las publicaciones que se encuentren activas 
  GetPublActivas(){
    return this.http.get(this.baseUrl+"/publ_Activa");
  }

  // Obtiene todas las publicaciones que se encuentren finalizadas 
  GetPublTerminadas(){
    return this.http.get(this.baseUrl+"/publ_Terminadas");
  }

  // --------------- METODOS POST ------------------// 

  // Envia los datos que se van a actualizar de un usuario
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

  // Crea una base de datos unica para la informacion del usuario
  CreateDatabase(Uid: any , Nombre: any, Apellido: any, Email: any){
    const data = {Nombre: Nombre, Apellido: Apellido, Email: Email}
    this.http.post(this.baseUrl+"/Create_Database/"+Uid, data).subscribe((res: any)=>{
      console.log(res);
    })
  }

  // Envia los datos para crear una publicacion 
  SendPublic(DataUser: any, Datos: any, Ubicacion: any){
    var date = new Date();
    const data = {NickName: DataUser.Usuario, 
      UidUser: this.Auth.currentUser?.uid,
      Titulo: Datos.titulotrabajo,
      Detalles: Datos.detallesTrabajo,
      Fecha: date.toDateString(),
      Hora: date.toTimeString(),
      TipoTrabajo: Datos.tipoTrabajo,
      ModalidadTrabajo: Datos.modalidadtrabajo,
      Vacantes: Datos.vacantes,
      Monto: Datos.monto,
      Ubicacion: Ubicacion}

    return this.http.post(this.baseUrl+"/Send_Publ", data);
  }

}
