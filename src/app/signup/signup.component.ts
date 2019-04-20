import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidator, AsyncValidatorFn } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    private authSevice: AuthService
  ) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondLastName: ['', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required], this.checkValidUsername(this.authSevice)],
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

    if (this.signupForm.invalid) {
      this.errorMessage = 'por favor';
      return;
    }
    this.alertService.show({
      title: '¡¡WARNING!!',
      body: '¿Estás seguro de hackear el ojo de dios?',
      cancelButton: true
    })

    let user = this.signupForm.value;

    this.authSevice.signup(user)
    .subscribe((res) => {
      console.log(res);
      console.log('registroExitoso');
    }, (err) => {
      console.log(err);
      console.log('registroFallido');
    })
  }

}
