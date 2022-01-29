import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { interval } from 'rxjs';

import { PomodoroService } from '@core/services/pomodoro.service';
import { ConfigService } from '@core/services/config.service';
@Component({
  selector: 'timer-button',
  templateUrl: './timer-button.component.html',
  styleUrls: ['./timer-button.component.css'],
})
export class TimerButtonComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  time: number = this.pomodoroService.currentTiming.value * 60;
  isTogglePlay: boolean = false;
  timing!: ReturnType<typeof setInterval>;
  interval!: Subscription;
  @ViewChild('progress') progressTimer!: ElementRef<SVGCircleElement>;

  constructor(
    private pomodoroService: PomodoroService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    /**
     * @method handleIsStartObservable() and
     * @method handleTimingConfigObservable() are to encapsuled
     * subscription to the @Service to change  state
     * @param currentConfig.Timing and @param isStart
     */
    this.handleIsStartObservable();
    this.handleTimingConfigObservable();
    this.handleCurrentTimer();
  }

  ngAfterViewChecked(): void {
    this.handleProgress();
  }

  ngOnDestroy(): void {
    this.interval.unsubscribe();
  }

  /**
   * Change isStart$  Observable state to
   * define if start timer or if stopped
   */
  handleIsStartObservable() {
    this.pomodoroService.isStart$.subscribe((isStart) => {
      this.isTogglePlay = isStart;
      this.isTogglePlay ? this.handleStartTimer() : this.handlePauseTimer();
    });
  }
  /**
   * Change current timing
   * must have 3 differences states
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

  handleCurrentTimer() {
    /**
     * TODO: fix this feature, every time to change a value in modal
     * in every tab always start in pomodoro tab.
     */
    this.configService.timing$.subscribe((data) => {
      this.pomodoroService.setCurrentTiming$(data[0]);
    });
  }

  // Handle ProgressBar SVG, to give feedback about
  // how time in timer
  handleProgress() {
    const element = this.progressTimer.nativeElement;
    const radius = element.getAttribute('r');
    const circumference = Number(radius) * 2 * Math.PI;
    const currentTimer = this.pomodoroService.currentTiming.value;
    element.style.strokeDasharray = `${circumference} ${circumference}`;
    element.style.strokeDashoffset = `${0}`;

    const percent = (this.time / (currentTimer * 60)) * 100;
    const offset = circumference - (percent / 100) * circumference;
    element.style.strokeDashoffset = `${offset}`;
  }

  /*  >>>>>> Timer Pomodoro Handle <<<<<<<<  */

  handlePauseTimer() {
    if (this.interval) {
      this.interval.unsubscribe();
    }
  }

  handleStartTimer() {
    this.interval = interval(1000).subscribe((n) => {
      this.time -= 1;
      if (this.time <= 0) {
        /**
         * if time end and goes 0 first one
         * change isStart Timer to false and stopped
         * */
        this.pomodoroService.toggleTiming$(false);
        /**
         * second one take value in currentTiming
         * and restart Timer with that value
         */
        this.pomodoroService.setCurrentTiming$(
          this.pomodoroService.currentTiming
        );
      }
    });
  }
  /**
   * use @Function from @Service PomodoroService,
   * to change state that observable
   */
  toggleIsStartTimer() {
    this.pomodoroService.toggleTiming$(!this.isTogglePlay);
  }
}
