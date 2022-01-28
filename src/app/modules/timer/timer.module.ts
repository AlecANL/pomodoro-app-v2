import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerButtonComponent } from './components/timer-button/timer-button.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SvgComponent } from './components/progress/svg.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TimerButtonComponent,
    ProgressComponent,
    SvgComponent,
    ModalComponent,
  ],
  exports: [
    TimerButtonComponent,
    ProgressComponent,
    SvgComponent,
    ModalComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
})
export class TimerModule {}
