import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
  providers: [BsModalService]
})
export class AlertModalComponent implements OnInit {
  @ViewChild('template') template: TemplateRef<any>;
  modalRef: BsModalRef;
  modalTitle: string;
  modalBody: string;

  constructor(
    private modalService: BsModalService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.alertSubject
      .subscribe((obj)=>{
        this.modalTitle = obj.title;
        this.modalBody = obj.body;
        this.openModal(this.template);
      })
  }

  openModal(template: TemplateRef <any>) {
    this.modalRef = this.modalService.show(template);
  }

}
