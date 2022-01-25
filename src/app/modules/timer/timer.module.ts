import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerButtonComponent } from './components/timer-button/timer-button.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SvgComponent } from './components/progress/svg.component';

@NgModule({
  declarations: [TimerButtonComponent, ProgressComponent, SvgComponent],
  exports: [TimerButtonComponent, ProgressComponent, SvgComponent],
  imports: [CommonModule],
})
export class TimerModule {}
