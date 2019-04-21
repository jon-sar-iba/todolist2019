import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.user = authService.getAuthUser();
  }


  ngOnInit() {
  }
  logout(): void {
    this.authService.deleteAuth();
    this.router.navigate(['/login']);
  }

}
