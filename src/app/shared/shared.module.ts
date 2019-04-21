import { NgModule } from '@angular/core';
import { CommonModule, getLocaleExtraDayPeriods } from '@angular/common';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AlertModalComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ModalModule,
    ModalModule.forRoot(),
    HttpClientModule
  ],
  exports: [
    AlertModalComponent,
    FontAwesomeModule
  ],
  providers: [
    AuthService
  ]
})
export class SharedModule { 
  constructor() {
    library.add(fas);
  }
}
