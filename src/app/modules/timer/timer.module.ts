import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@shared/shared.module';

import { TimerButtonComponent } from './components/timer-button/timer-button.component';
import { ProgressComponent } from './components/progress/progress.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [TimerButtonComponent, ProgressComponent, ModalComponent],
  exports: [TimerButtonComponent, ProgressComponent, ModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
})
export class TimerModule {}
