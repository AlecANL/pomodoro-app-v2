import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '@core/services/modal.service';
import { IConfig } from '@core/models/pomodoro.interface';
import { PomodoroService } from '@core/services/pomodoro.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  modalForm: FormGroup = this.fb.group({
    pomodoro: [25],
    shortBreak: [5],
    longBreak: [15],
    color: ['red'],
    font: ['kumbh'],
  });

  get isShowModal() {
    return this.modalService.isShowModal;
  }

  constructor(
    private modalService: ModalService,
    private pomodoroService: PomodoroService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  modalAnimationClass(): string {
    return this.modalService.isShowModal
      ? 'animate__fadeInDownBig'
      : 'animate__fadeOutUpBig';
  }

  toggleSave() {
    console.log(this.modalForm.value);
    // this.modalService.toggleModal();
  }

  toggleModal() {
    this.modalService.toggleModal();
    // this.toggle();
  }

  getClass(prop: string, value: string) {
    return this.modalForm.get(prop)?.value === value;
  }

  handleSetColor(color: IConfig, prop: string) {
    this.pomodoroService.setLocaleState(color, prop);
  }
}
