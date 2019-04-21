import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: { email: string, password: string } = {
    email: '',
    password: ''
  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  login(event: Event): void {
    event.preventDefault();

    this.authService.authenticate(this.credentials)
      .subscribe((res) => {
        this.authService.setAuthToken(res);

        this.authService.getAuth()
          .subscribe((user) => {
            this.authService.setAuthUser(user);
            this.router.navigate(['/home']);
          })
      })
  }

}
