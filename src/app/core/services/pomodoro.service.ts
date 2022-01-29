import { Injectable } from '@angular/core';

import { IDefault, IPomodoro } from '@core/models/pomodoro.interface';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ITimingConfig, IShortConfig } from '../models/pomodoro.interface';
import { SaveStorage } from './save-storage.service';

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

  private _storageKey = environment.pomodoroServiceStorageKey;
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

  constructor(private saveStorage: SaveStorage) {
    this.getInitialConfig();
  }

  get currentTiming() {
    return this._state.currentConfig.timing;
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

  handleSaveStorage(key: string, data: IDefault | string | ITimingConfig[]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getInitialConfig() {
    const config = this.saveStorage.onGeToStorage<IDefault | null>(
      this._storageKey
    );

    if (!config) {
      this.saveStorage.onSaveStorage<IDefault>(
        this._storageKey,
        this._state.currentConfig
      );
      return;
    }

    this._state = {
      ...this._state,
      currentConfig: { ...config },
    };
  }
}
