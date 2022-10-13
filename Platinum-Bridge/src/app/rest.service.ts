import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Database, get, ref, getDatabase} from '@angular/fire/database';
import { child } from '@firebase/database';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  dbRef = ref(getDatabase());
  constructor(private http: HttpClient) {



  }

   public get(url:string){
    
    get(child(this.dbRef,"users")).then((snapshot) => {
    return console.log(snapshot.val());
    
  })
  }
}
