import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TimerModule } from '@modules/timer/timer.module';

import { SharedModule } from '@shared/shared.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, TimerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
