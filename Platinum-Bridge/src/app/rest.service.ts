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

  //public GetUsers(url:string){
  //  return this.http.get("/users")
  //}
  public GetUsers(){
    return this.http.get(this.baseUrl+"/users").subscribe((res: any)=>{
      console.log(res);
    });
  }
}
