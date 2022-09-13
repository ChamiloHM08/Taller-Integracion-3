import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Platinum-Bridge';
  constructor(
    private userService: UsersService,
    private router: Router
  ) { }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

}
