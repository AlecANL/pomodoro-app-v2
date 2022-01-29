import { Component, OnInit } from '@angular/core';
import { IMenuOptions } from '@shared/models/menu.interface';
import { PomodoroService } from '@core/services/pomodoro.service';
import { ITimingConfig } from '../../../core/models/pomodoro.interface';
import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  private _menuOptions: ITimingConfig[] = this.configService.timings;

  activeTab: string = 'pomodoro';

  constructor(
    private pomodoroService: PomodoroService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.configService.timing$.subscribe((data) => {
      console.log('>>> menu:', data);
      this._menuOptions = data;
    });
  }

  get timings() {
    return this._menuOptions;
  }

  handleTabChange(configTiming: ITimingConfig) {
    this.activeTab = configTiming.longName;
    this.pomodoroService.setCurrentTiming$(configTiming);
    this.pomodoroService.toggleTiming$(false);
  }
}
