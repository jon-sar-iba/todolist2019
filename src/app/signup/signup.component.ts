import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidator, AsyncValidatorFn, EmailValidator } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

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

  signupForm: FormGroup;
  submittedForm: boolean = false;
  errorMessage: string = '';
  //firstStatu: boolean = false;
  passText: string = 'Contraseña';

  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.buildForm();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
      return;
    }
  }
  buildForm() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ], this.checkValidEmail(this.authService)],
      username: ['', [Validators.required], this.checkValidUsername(this.authService)],
      passwords: this.fb.group({
        psw: ['', [Validators.required]],
        confirm: ['', [Validators.required]]

      }, {
          validator: (group: FormGroup) => {
            let first = group.get('psw').value;
            let confirm = group.get('confirm').value;


            return first === confirm ? null : { notSame: true };
          }
        })
    });

    this.signupForm.valueChanges
      .subscribe(() => {
        this.errorMessage = '';
        this.submittedForm = false;
      })
  }

  //VALIDACION DEL NOMBRE DE USUARIO
  checkValidUsername(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return authService.findUsername(control.value)
        .pipe(
          map((res: any) => {
            return res.username ? { usernameExists: true } : null;
          })
        )
    }
  }
  //VALIDACION DEL EMAIL(CORREOELECTRONICO)
  checkValidEmail(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return authService.findEmail(control.value)
        .pipe(
          map((res: any) => {
            return res.email ? { emailExists: true } : null;
          })
        )
    }
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
    this.submittedForm = true;

    console.log(this.signupForm.controls);

    if (this.signupForm.invalid) {
      this.errorMessage = 'por favor';
      return;
    }

    this.alertService.show({
      title: '¡¡WARNING!!',
      body: 'Are you sure to hack the eye of God?',
      cancelButton: true,
      type: 'error'
    }).then((result) => {
      let user: User = this.signupForm.value;

      user.password = this.signupForm.value.passwords.psw;


      if (result.action === 'accept') {
        this.authService.signup(user)
          .subscribe((res) => {
            this.authService.setAuthToken(res);
            this.authService.getAuth()
              .subscribe((authUser) => {
                this.authService.setAuthUser(authUser);
                this.router.navigate(['/home'])
              })
            console.log(res);
            console.log('registroExitoso');
          }, (err) => {
            console.log(err);
            console.log('registroFallido');

            this.alertService.show({
              body: err.error.message || err.message
            });
          })
  }


})


  }

}
