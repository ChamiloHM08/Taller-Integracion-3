import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Servicios/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit(value: any){
    this.userService.register(value);
  }

}
