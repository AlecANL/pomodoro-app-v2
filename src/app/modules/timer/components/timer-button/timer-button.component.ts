import { Component, OnDestroy, OnInit } from '@angular/core';

import { PomodoroService } from '@core/services/pomodoro.service';
@Component({
  selector: 'timer-button',
  templateUrl: './timer-button.component.html',
  styleUrls: ['./timer-button.component.css'],
})
export class TimerButtonComponent implements OnInit, OnDestroy {
  time: number = 25 * 60;
  isTogglePlay: boolean = false;
  timing!: ReturnType<typeof setInterval>;

  constructor(private pomodoroService: PomodoroService) {}

  ngOnInit(): void {
    /**
     * @method handleIsStartObservable() and
     * @method handleTimingConfigObservable() are to encapsuled
     * subscription to the @Service to change  state
     * @param currentConfig.Timing and @param isStart
     */
    this.handleIsStartObservable();
    this.handleTimingConfigObservable();
  }

  /**
   * Change current timing
   * should have 3 differences states
   * 1 Pomodoro
   * 2 short break
   * 3 Long break
   * only one contain name, value and longName
   */
  handleTimingConfigObservable() {
    this.pomodoroService.timing$.subscribe((timingConfig) => {
      this.time = timingConfig.value * 60;
    });
  }

  /**
   * Change isStart$  Observable state to
   * define if start timer or stopped
   */
  handleIsStartObservable() {
    this.pomodoroService.isStart$.subscribe((isStart) => {
      this.isTogglePlay = isStart;
      this.isTogglePlay ? this.handleTiming() : this.pauseTimer();
    });
  }

  /**
   * use @Function from @Service PomodoroService,
   * to change state that observable
   */
  toggle() {
    this.pomodoroService.toggleTiming$(!this.isTogglePlay);
  }
  /**
   * Manage timer countdown the timer
   */
  handleTiming() {
    this.timing = setInterval(() => {
      this.time -= 1;
      if (this.time <= 0) {
        // Paused Timer, and restart to initial values
        this.pomodoroService.toggleTiming$(false);
        this.pomodoroService.setCurrentTiming$(
          this.pomodoroService.currentTiming
        );
      }
    }, 1000);
  }

  present(value: number) {
    return `${('0' + Math.floor(value / 60)).slice(-2)}:${(
      '0' + Math.floor(value % 60)
    ).slice(-2)}`;
  }

  pauseTimer() {
    clearInterval(this.timing);
  }

  ngOnDestroy(): void {
    clearInterval(this.timing);
  }
}
