import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '@core/services/modal.service';
import { IConfig, ITimingConfig } from '@core/models/pomodoro.interface';
import { PomodoroService } from '@core/services/pomodoro.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigService } from '@core/services/config.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  modalForm!: FormGroup;

  constructor(
    private modalService: ModalService,
    private pomodoroService: PomodoroService,
    private configService: ConfigService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      pomodoro: [25],
      shortBreak: [5],
      longBreak: [15],
      color: ['radical-red'],
      font: ['kumbh-sans'],
    });
  }

  ngOnDestroy(): void {}

  get isShowModal() {
    return this.modalService.isShowModal;
  }

  get fontList() {
    return this.configService.fonts;
  }

  get colorList() {
    return this.configService.colors;
  }

  modalAnimationClass(): string {
    return this.modalService.isShowModal
      ? 'animate__fadeInDownBig'
      : 'animate__fadeOutUpBig';
  }

  onSaveTimings() {
    const pomodoro = this.modalForm.get('pomodoro')?.value;
    const shortBreak = this.modalForm.get('shortBreak')?.value;
    const longBreak = this.modalForm.get('longBreak')?.value;
    const timings: ITimingConfig[] = [
      {
        name: 'pomodoro',
        longName: 'pomodoro',
        value: pomodoro,
      },
      {
        name: 'short break',
        longName: 'shortBreak',
        value: shortBreak,
      },
      {
        name: 'long break',
        longName: 'longBreak',
        value: longBreak,
      },
    ];

    this.configService.setTimings(timings);
  }

  onSaveFont() {
    const font = this.modalForm.get('font')?.value;
    this.pomodoroService.setCurrentFont({
      value: font,
    });
  }

  onSaveColor() {
    const color = this.modalForm.get('color')?.value;
    this.pomodoroService.setCurrentColor({
      value: color,
    });
  }

  toggleSave() {
    console.log(this.modalForm.value);
    this.onSaveTimings();
    this.onSaveColor();
    this.onSaveFont();
    this.pomodoroService.handleSaveStorage(
      'pomodoro_v1',
      this.pomodoroService.currentConfig
    );
    // this.modalService.toggleModal();
  }

  toggleModal() {
    this.modalService.toggleModal();
    // this.toggle();
  }

  getModalClass() {
    const color = this.modalForm.get('color')?.value;
    const font = this.modalForm.get('font')?.value;
    return `modal modal-color-${color} modal-font-${font}`;
  }

  getButtonClass() {
    const color = this.modalForm.get('color')?.value;
    return `modal-btn button-color-${color}`;
  }

  getClass(prop: string, value: string) {
    const isActive = this.modalForm.get(prop)?.value === value;
    return {
      active: isActive,
      cyan: value === 'cyan',
      magenta: value === 'magenta',
      'radical-red': value === 'radical-red',
      kumbh: value === 'kumbh-sans',
      mono: value === 'mono-space',
      roboto: value === 'roboto-slab',
    };
  }
}
