import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  passwordPreviews = {
    first: true,
    confirm: true
  }

  //firstStatu: boolean = false;
  passText: string = 'Contraseña';
  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }


  getIcon(value: boolean): string {
    if (value) {
      return 'eye-slash';
    } else {
      return 'eye';
    }
  }

  signup(event: Event): void {
    event.preventDefault();

    this.alertService.show({
      title: '¡¡WARNING!!',
      body: '¿Estás seguro de hackear la NASA?'
    })
  }

}
