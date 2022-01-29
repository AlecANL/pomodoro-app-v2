import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit, AfterViewChecked {
  // @ViewChild('progress') progressTimer!: ElementRef<SVGCircleElement>;
  // @Input() currentTime!: number;
  // @Input() timeInInterval!: number;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.handleProgress();
  }

  handleProgress() {
    // const element = this.progressTimer.nativeElement;
    // const radius = element.getAttribute('r');
    // const circumference = Number(radius) * 2 * Math.PI;
    // const currentTimer = this.currentTime;
    // element.style.strokeDasharray = `${circumference} ${circumference}`;
    // element.style.strokeDashoffset = `${0}`;
    // const percent = (this.timeInInterval / (currentTimer * 60)) * 100;
    // const offset = circumference - (percent / 100) * circumference;
    // element.style.strokeDashoffset = `${offset}`;
  }
}
