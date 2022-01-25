import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'timer-button',
  templateUrl: './timer-button.component.html',
  styleUrls: ['./timer-button.component.css'],
})
export class TimerButtonComponent implements OnInit, OnDestroy {
  time: number = 2 * 60;
  timing!: ReturnType<typeof setInterval>;
  togglePlay: boolean = false;

  ngOnInit(): void {}

  constructor() {}

  toggle() {
    this.togglePlay = !this.togglePlay;
    console.log(this.togglePlay ? 'paused' : 'play');
    !this.togglePlay ? this.pauseTimer() : this.handleTiming();
  }

  handleTiming() {
    this.timing = setInterval(() => {
      this.time = this.time - 1;
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
