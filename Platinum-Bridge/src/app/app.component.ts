import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/users.service';
import { RestService } from './rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Platinum-Bridge';
  usuario: any;
  constructor(
    private userService: UsersService,
    private router: Router,
    private RestService: RestService
  ) { }

  ngOnInit(): void {

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
