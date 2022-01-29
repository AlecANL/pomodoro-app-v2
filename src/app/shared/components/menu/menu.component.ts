import { Component, OnInit } from '@angular/core';

import { PomodoroService } from '@core/services/pomodoro.service';
import { ConfigService } from '@core/services/config.service';

import { ITimingConfig } from '@core/models/pomodoro.interface';

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
    /**
     *
     * In this observable do watch every time to change timings list in
     * @Service config.service.ts through @Component modal.
     * @Component Modal through form change, change  value property to the every
     * timing option. So if this one list change this component should know
     * what if the new values in timing list
     */
    this.configService.timing$.subscribe((data) => {
      console.log(data);
      this._menuOptions = data;
    });
  }

  get timings() {
    return this._menuOptions;
  }

  handleTabChange(configTiming: ITimingConfig) {
    this.activeTab = configTiming.longName;

    /**
     * Every time to change tab. Change timing property in
     * currentConfig @service pomodoro.service.ts
     * */

    this.pomodoroService.setCurrentTiming$(configTiming);

    //Every time to change tab. I need to pause Timer
    this.pomodoroService.toggleTiming$(false);
  }
}
