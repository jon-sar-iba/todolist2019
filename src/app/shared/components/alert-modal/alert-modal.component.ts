import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertService } from '../../services/alert.service';
import { CustomAlert } from 'src/app/models/alert';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
  providers: [BsModalService]
})
export class AlertModalComponent implements OnInit {
  @ViewChild('template') template: TemplateRef<any>;
  modalRef: BsModalRef;
  resolveFn: (value: { action: 'accept' | 'cancel' }) => void;

  alertInfo: CustomAlert = {
    accptButtonText: 'aceptar',
    cancelButton: false,
    cancelButtonText: 'cancelar',
    body: '',
    title: 'Alerta',
    type: 'success'
  };

  constructor(
    private modalService: BsModalService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.alertSubject
      .subscribe((obj) => {
        /*this.modalTitle = obj.title;
        this.modalBody = obj.body;*/
        this.alertInfo = Object.assign(<CustomAlert>{
          accptButtonText: 'aceptar',
          cancelButton: false,
          cancelButtonText: 'cancelar',
          body: '',
          title: 'Alerta',
          type: 'success'
        }, obj.info);

        this.resolveFn = obj.resolve;

        this.openModal(this.template);
      })
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  accept(): void {
    if (this.resolveFn && typeof this.resolveFn === 'function') {
      this.resolveFn({ action: 'accept' });
      this.closeModal();
    }
  }

  cancel(): void {
    if (this.resolveFn && typeof this.resolveFn === 'function') {
      this.resolveFn({ action: 'cancel' });
      this.closeModal();
    }
  }

}
