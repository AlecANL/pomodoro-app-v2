import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PomodoroService } from '@core/services/pomodoro.service';
import { ConfigService } from '@core/services/config.service';
import { ModalService } from '@core/services/modal.service';

import { ITimingConfig } from '@core/models/pomodoro.interface';
import { IDefault } from '@core/models/pomodoro.interface';
import { environment } from 'src/environments/environment';
import { SaveStorage } from '@core/services/save-storage.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('modal-content', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100),
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' })),
      ]),
    ]),
  ],
})
export class ModalComponent implements OnInit {
  private _configStorageKey = environment.configStorageServiceKey;
  private _pomodoroStorageKey = environment.pomodoroServiceStorageKey;

  modalForm: FormGroup = this.fb.group({
    pomodoro: [
      25,
      [Validators.min(25), Validators.max(60), Validators.required],
    ],
    shortBreak: [
      5,
      [Validators.min(5), Validators.max(60), Validators.required],
    ],
    longBreak: [
      15,
      [Validators.min(15), Validators.max(60), Validators.required],
    ],
    color: ['radical-red'],
    font: ['kumbh-sans'],
  });

  constructor(
    private modalService: ModalService,
    private pomodoroService: PomodoroService,
    private configService: ConfigService,
    private saveStorage: SaveStorage,
    private fb: FormBuilder
  ) {
    this.loadFormValuesToStorage();
  }

  ngOnInit(): void {}

  get isShowModal() {
    return this.modalService.isShowModal;
  }

  get timingList() {
    return this.configService.timings;
  }

  get fontList() {
    return this.configService.fonts;
  }

  get colorList() {
    return this.configService.colors;
  }

  /* ============ Load Form ============== */

  loadFormValuesToStorage() {
    this.loadColorAndFont();
    this.loadTimings();
  }

  /**
   *
   * evaluate if exits config in LocalStorage.
   * if not exits return null and end function.
   * otherwise load config to form with data in :LocalStorage
   */
  loadColorAndFont() {
    const config = this.saveStorage.onGeToStorage<IDefault>(
      this._pomodoroStorageKey
    );
    if (!config) {
      return;
    }
    this.modalForm.get('color')?.reset(config.color.value);
    this.modalForm.get('font')?.reset(config.font.value);
  }
  /**
   *
   * Same function to @function loadColorAndFont()
   * load config but. Config the timings
   */
  loadTimings() {
    const timings = this.saveStorage.onGeToStorage<ITimingConfig[]>(
      this._configStorageKey
    );

    if (!timings) {
      return;
    }
    timings.forEach((timing) => {
      this.modalForm.get(timing.longName)?.reset(timing.value);
    });
  }

  toggleModal() {
    this.modalService.toggleModal();
  }

  /*============ Save Configuration =============== */

  toggleSave() {
    if (!this.modalForm.valid) {
      console.error('whoops form is invalid');
      return;
    }
    this.onSaveTimings();
    this.onSaveColor();
    this.onSaveFont();
    this.onSaveConfiguration();
  }

  /**
   * Save Configuration in LocalStorage.
   * to change color or font, call functions @function onSaveColor, and @function onSaveFont
   * then to persists these data. it's necessary to call function to save in storage
   */
  onSaveConfiguration() {
    this.saveStorage.onSaveStorage<IDefault>(
      this._pomodoroStorageKey,
      this.pomodoroService.currentConfig
    );
  }

  /**
   * Prepare timings to save in LocalStorage.
   * if change any value in form, save in localStorage
   * to persists this data. and every reload browser
   * persists this one.
   */

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

  /* =========== Handles HTMLClasses ============= */

  getButtonClass() {
    const color = this.modalForm.get('color')?.value;
    return `modal-btn button-color-${color}`;
  }

  getErrorClass(message: string, txt: string) {
    const isValid = this.modalForm.invalid && this.modalForm.touched;
    const field = this.modalForm.get(txt)?.invalid;

    return isValid && field ? message : '';
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
