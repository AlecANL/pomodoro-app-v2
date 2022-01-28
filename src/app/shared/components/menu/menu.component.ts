import { Component, OnInit } from '@angular/core';
import { IMenuOptions } from '@shared/models/menu.interface';
import { PomodoroService } from '@core/services/pomodoro.service';
import { ITimingConfig } from '../../../core/models/pomodoro.interface';

@Component({
  selector: 'nav-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menuOptions: ITimingConfig[] = this.pomodoroService.configTimingList;

  activeTab: string = 'pomodoro';

  constructor(private pomodoroService: PomodoroService) {}

  ngOnInit(): void {}

  handleTabChange(configTiming: ITimingConfig) {
    this.activeTab = configTiming.longName;
    this.pomodoroService.setCurrentTiming$(configTiming);
    this.pomodoroService.toggleTiming$(false);
  }
}
