import { UserService } from './user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotrx';

  constructor(private userService: UserService) {
    
  }

  ngOnInit() {
    if (location.search) {
      this.userService.getToken();
    }
  }

  login() {
    this.userService.login()
  }
}
