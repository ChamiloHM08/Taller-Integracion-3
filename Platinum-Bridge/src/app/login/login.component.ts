import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private userSevice: UsersService,
    private router: Router
  ) { 
    this.formLogin = new FormGroup({
      email: new FormControl,
      password: new FormControl

    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userSevice.login(this.formLogin.value);
  
  }

  onclickGoogle(){
    this.userSevice.loginGoogle();
      
  }

}
