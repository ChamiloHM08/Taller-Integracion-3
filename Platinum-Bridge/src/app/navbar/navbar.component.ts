import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/users.service';
import { RestService } from '../rest.service';
import { Auth} from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'Platinum-Bridge';
  public User = false;
  constructor(private userService: UsersService, private router: Router, private RestService: RestService, private Auth: Auth) { }

async ngOnInit(){
  this.Auth.onAuthStateChanged(user =>{
    if(user){
      this.User = true;
    }else{
      this.User = false;
    }
  })
}
   
  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }
// xd

  onClick2() {
    console.log(this.RestService.GetUsers());
    
  }

}
