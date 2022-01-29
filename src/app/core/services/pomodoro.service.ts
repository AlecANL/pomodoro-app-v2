import { Injectable } from '@angular/core';

import { IDefault, IPomodoro } from '@core/models/pomodoro.interface';
import { IConfig } from '@core/models/pomodoro.interface';
import { Observable, Subject } from 'rxjs';
import { ITimingConfig, IShortConfig } from '../models/pomodoro.interface';

@Injectable({
  providedIn: 'root',
})
export class PomodoroService {
  // Subjects
  private timingCurrent$: Subject<ITimingConfig> = new Subject();
  private isStartTiming$: Subject<boolean> = new Subject();

  // Observables
  timing$: Observable<ITimingConfig> = this.timingCurrent$.asObservable();
  isStart$: Observable<boolean> = this.isStartTiming$.asObservable();

  private _storageKey = 'pomodoro_v1';
  private _state: IPomodoro = {
    currentConfig: {
      color: {
        value: 'radical-red',
      },
      font: {
        value: 'kumbh-sans',
      },
      timing: {
        name: 'pomodoro',
        longName: 'pomodoro',
        value: 25,
      },
    },
  };
  private _localeState: IDefault = { ...this._state.currentConfig };

  get currentTiming() {
    return this._state.currentConfig.timing;
  }

  /**
   * @param config  must be type ITimingConfig
   * this @method only function, is change the currentTiming. View @property _state
   * is used in <menu></menu> @component to change in 3
   * differences states "Pomodoro" | "shortBreak" | "longBreak"
   */
  setCurrentTiming$(config: ITimingConfig) {
    this._state.currentConfig.timing = { ...config };
    this.timingCurrent$.next({ ...this._state.currentConfig.timing });
  }

  /**
   * @param isStart must be a boolean type
   * this change if <timer-button></timer-button> @component
   * is start or should  stopped.
   * is used in menu @component to if change state
   * to the pomodoro or another 3 states and must be
   * stopped timing and reset initialState
   */
  toggleTiming$(isStart: boolean) {
    this.isStartTiming$.next(isStart);
  }

  setCurrentColor(color: IShortConfig) {
    this._state.currentConfig.color = { ...color };
  }

  setCurrentFont(font: IShortConfig) {
    this._state.currentConfig.font = { ...font };
  }

  // get isStartTiming(): Observable<boolean> {
  //   return this.isStartTiming$.asObservable();
  // }

  // get observableTiming(): Observable<ITimingConfig> {
  //   return this.timingCurrent$.asObservable();
  // }

  constructor() {
    this.handleGetInitialConfig();
  }

  // get config() {
  //   return this._state.config;
  // }

  get color() {
    return this._state.currentConfig.color;
  }
  get font() {
    return this._state.currentConfig.font;
  }

  get currentConfig() {
    return this._state.currentConfig;
  }

  handleSaveStorage(key: string, data: IDefault | string | ITimingConfig[]) {
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
      this.handleSaveStorage(this._storageKey, this._state.currentConfig);
      return;
    }
    this._state = {
      ...this._state.currentConfig,
      currentConfig: { ...config },
    };
    return;
  }

  // handleConfigChange(config: IDefault) {
  //   this._state = { ...this._state, currentConfig: { ...config } };
  //   this.handleSaveStorage(this._storageKey, this.currentConfig);
  // }
}
