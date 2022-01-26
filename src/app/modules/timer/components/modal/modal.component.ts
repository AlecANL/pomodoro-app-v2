import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '@core/services/modal.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  get isShowModal() {
    return this.modalService.isShowModal;
  }

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  modalAnimationClass(): string {
    return this.modalService.isShowModal
      ? 'animate__fadeInDownBig'
      : 'animate__fadeOutUpBig';
  }

  toggleSave() {
    this.modalService.toggleModal();
  }

  toggleModal() {
    this.modalService.toggleModal();
    // this.toggle();
  }
}
