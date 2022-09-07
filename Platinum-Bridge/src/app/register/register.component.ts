import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;

  constructor(
    private userService: UsersService

  ) { 
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()

    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }

}
