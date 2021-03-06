import { Injectable } from '@angular/core';
import { IConfigService } from '@core/models/pomodoro.interface';
import { ITimingConfig } from '../models/pomodoro.interface';
import { Subject, Observable } from 'rxjs';
import { PomodoroService } from './pomodoro.service';
import { SaveStorage } from './save-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private timings$: Subject<ITimingConfig[]> = new Subject();
  private _configTimingKey: string = environment.configStorageServiceKey;

  // Observables
  timing$: Observable<ITimingConfig[]> = this.timings$.asObservable();

  constructor(private saveStorage: SaveStorage) {
    this.onSaveSome();
  }

  onSaveSome() {
    if (!localStorage.getItem(this._configTimingKey)) {
      return;
    }
    const data = JSON.parse(
      localStorage.getItem(this._configTimingKey) as string
    );
    this._config.timings = [...data];
    this.timings$.next(this._config.timings);
  }

  private _config: IConfigService = {
    fonts: [
      {
        name: 'kumbh',
        value: 'kumbh-sans',
      },
      {
        name: 'space',
        value: 'space-mono',
      },
      {
        value: 'roboto-slab',
        name: 'roboto',
      },
    ],
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
    timings: [
      {
        name: 'pomodoro',
        longName: 'pomodoro',
        value: 25,
      },
      {
        name: 'short break',
        longName: 'shortBreak',
        value: 5,
      },
      {
        name: 'long break',
        longName: 'longBreak',
        value: 15,
      },
    ],
  };

  get fonts() {
    return [...this._config.fonts];
  }

  get colors() {
    return [...this._config.colors];
  }

  get timings() {
    return [...this._config.timings];
  }

  setTimings(timingList: ITimingConfig[]) {
    this.timings$.next(timingList);
    this.saveStorage.onSaveStorage(this._configTimingKey, timingList);
  }
}
