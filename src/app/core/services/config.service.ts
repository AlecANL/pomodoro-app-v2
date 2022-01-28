import { Injectable } from '@angular/core';
import { IConfigService } from '@core/models/pomodoro.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _config: IConfigService = {
    fonts: [],
    colors: [
      {
        name: 'red',
        value: 'radical-red',
      },
      {
        name: 'magenta',
        value: 'magenta',
      },
      {
        name: 'cyan',
        value: 'cyan',
      },
    ],
    timings: [],
  };
}
