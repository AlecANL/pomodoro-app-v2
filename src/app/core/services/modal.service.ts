import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isShowModal: boolean = false;

  toggleModal() {
    this.isShowModal = !this.isShowModal;
  }
}
