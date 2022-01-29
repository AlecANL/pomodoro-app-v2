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
  constructor(
    private modalService: ModalService,
    private pomodoroService: PomodoroService
  ) {}

  toggleModal() {
    this.modalService.toggleModal();
  }

  get themeClass() {
    const color = this.pomodoroService.color.value;
    const font = this.pomodoroService.font.value;
    return `${color} ${font}`;
  }
}
