import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { PomodoroService } from '@core/services/pomodoro.service';
import { ConfigService } from '@core/services/config.service';
import { ITimingConfig } from '@core/models/pomodoro.interface';
@Component({
  selector: 'timer-button',
  templateUrl: './timer-button.component.html',
  styleUrls: ['./timer-button.component.css'],
})
export class TimerButtonComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked
{
  time: number = this.pomodoroService.currentTiming.value * 60;
  isTogglePlay: boolean = false;
  timing!: ReturnType<typeof setInterval>;
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

    if (this.progressTimer) {
      console.log(this.progressTimer.nativeElement);
    }
  }

  ngAfterViewChecked(): void {
    this.handleProgress();
  }

  ngAfterViewInit(): void {
    // this.handleProgress();
  }
  // get time() {
  //   return this.pomodoroService.currentTiming.value * 60
  // }

  handleProgress() {
    const element = this.progressTimer.nativeElement;
    const radius = element.getAttribute('r');
    console.log(radius);
    const circumference = Number(radius) * 2 * Math.PI;
    const currentTimer = this.pomodoroService.currentTiming.value;
    element.style.strokeDasharray = `${circumference} ${circumference}`;
    element.style.strokeDashoffset = `${0}`;

    const percent = (this.time / (currentTimer * 60)) * 100;
    const offset = circumference - (percent / 100) * circumference;
    console.log('>>> percent: ', percent);
    console.log('>>> offset: ', offset);
    console.log('>>> time', currentTimer);
    console.log('>>> timeInterval', this.time);
    element.style.strokeDashoffset = `${offset}`;
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
      console.log(`>> timingConfig observable>>>`, timingConfig);
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

  handleCurrentTimer() {
    this.configService.timing$.subscribe((data) => {
      this.pomodoroService.setCurrentTiming$(data[0]);
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
