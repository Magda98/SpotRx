import { Observable } from 'rxjs';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userData: Observable<User>;

  constructor(private userService: UserService) { 
    this.userData = userService.getUserData();
  }

  ngOnInit(): void {
  }

}
