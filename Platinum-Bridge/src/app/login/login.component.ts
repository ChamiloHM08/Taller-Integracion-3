import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private userSevice: UsersService
  ) { 
    this.formLogin = new FormGroup({
      email: new FormControl,
      password: new FormControl

    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userSevice.login(this.formLogin.value)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }

}
