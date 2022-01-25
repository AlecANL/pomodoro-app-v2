import { Injectable } from '@angular/core';

import { IDefault, IPomodoro } from '@core/models/pomodoro.interface';
import { IConfig } from '@core/models/pomodoro.interface';

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  private _storageKey = 'pomodoro_v1';
  private _state: IPomodoro = {
    currentConfig: {
      color: {
        name: 'red',
        value: 'radical-red',
      },
      font: {
        name: 'kumbh',
        value: 'kumbh-sans',
      },
      timing: [
        {
          name: 'pomodoro',
          value: 25,
        },
        {
          name: 'shortBreak',
          value: 5,
        },
        {
          name: 'longBreak',
          value: 25,
        },
      ],
    },
    config: {
      colors: [],
      fonts: [],
      timing: [],
    },
  };

  constructor() {
    this.handleGetInitialConfig();
  }

  get config() {
    return this._state.config;
  }

  get color() {
    return this._state.currentConfig.color;
  }
  get font() {
    return this._state.currentConfig.font;
  }

  get currentConfig() {
    return this._state.currentConfig;
  }

  handleSaveStorage(key: string, data: IDefault | string) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  handleGetToStorage<T = any>(key: string): T | null {
    if (!localStorage.getItem(key)) {
      console.warn(
        `whoops cannot find anything in localeStorage with key:${key}`
      );
      return null;
    }
    return JSON.parse(localStorage.getItem(key) as string);
  }

  handleGetInitialConfig() {
    const config = this.handleGetToStorage<IDefault>(this._storageKey);
    if (!config) {
      this.handleSaveStorage(this._storageKey, this.currentConfig);
      return;
    }
    this._state = { ...this._state, currentConfig: { ...config } };
    return;
  }

  handleConfigChange(config: IDefault) {
    this._state = { ...this._state, currentConfig: { ...config } };
    this.handleSaveStorage(this._storageKey, this.currentConfig);
  }
}
