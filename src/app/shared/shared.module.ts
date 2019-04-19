import { NgModule } from '@angular/core';
import { CommonModule, getLocaleExtraDayPeriods } from '@angular/common';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [AlertModalComponent],
  imports: [
    CommonModule,
    ModalModule,
    ModalModule.forRoot()
  ],
  exports: [AlertModalComponent]
})
export class SharedModule { }
