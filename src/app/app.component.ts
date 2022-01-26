import { Component } from '@angular/core';
import { IConfig, ITimingConfig } from '@core/models/pomodoro.interface';
import { PomodoroService } from '@core/services/pomodoro.service';
import { ModalService } from './core/services/modal.service';

interface IConfigApp {
  config: {
    color: IConfig;
    font: IConfig;
  };
  pomodoro: ITimingConfig;
  shortBreak: ITimingConfig;
  longBreak: ITimingConfig;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private modalService: ModalService) {}

  toggleModal() {
    this.modalService.toggleModal();
  }

  // fontList: IConfig[] = [
  //   { name: 'kumbh', value: 'kumbh-sans' },
  //   { name: 'roboto', value: 'roboto-slab' },
  //   { name: 'mono', value: 'mono-space' },
  // ];
  // colorList: IConfig[] = [
  //   {
  //     name: 'red',
  //     value: 'red-radical',
  //   },
  //   {
  //     name: 'aqua',
  //     value: 'aqua',
  //   },
  //   {
  //     name: 'violet',
  //     value: 'violet',
  //   },
  // ];
  // private _state: IConfigApp = {
  //   config: {
  //     color: {
  //       name: 'red',
  //       value: 'radical-red',
  //     },
  //     font: {
  //       name: 'kumbh',
  //       value: 'kumbh-sans',
  //     },
  //   },
  //   pomodoro: {
  //     name: 'pomodoro',
  //     value: 25,
  //   },
  //   shortBreak: {
  //     name: 'short',
  //     value: 5,
  //   },
  //   longBreak: {
  //     name: 'long',
  //     value: 30,
  //   },
  // };
  // constructor(private pomodoroService: PomodoroService) {}
  // get themeClass() {
  //   return `${this.pomodoroService.color.value} ${this.pomodoroService.font.value}`;
  // }
  // get timingList() {
  //   return this.pomodoroService.currentConfig.timing;
  // }
  // get currentConfig() {
  //   return this.pomodoroService.currentConfig;
  // }
  // handleChange(prop: string, config: IConfig) {
  //   if (prop === 'color') {
  //     this._state = {
  //       ...this._state,
  //       config: { ...this._state.config, color: { ...config } },
  //     };
  //   } else if (prop === 'font') {
  //     this._state = {
  //       ...this._state,
  //       config: { ...this._state.config, font: { ...config } },
  //     };
  //   }
  // }
  // handleSaveConfig() {
  //   const timing = [
  //     this._state.longBreak,
  //     this._state.shortBreak,
  //     this._state.pomodoro,
  //   ];
  //   this.pomodoroService.handleConfigChange({
  //     ...this._state.config,
  //     timing: timing,
  //   });
  // }
  // handleInputChange(config: ITimingConfig, event: any) {
  //   const obj = { name: event.name, value: +event.value };
  //   switch (event.name) {
  //     case 'shortBreak':
  //       this._state.shortBreak = { ...obj };
  //       return;
  //     case 'longBreak':
  //       this._state.longBreak = { ...obj };
  //       return;
  //     case 'pomodoro':
  //       this._state.pomodoro = { ...obj };
  //       return;
  //     default:
  //       return;
  //   }
  // }
}
