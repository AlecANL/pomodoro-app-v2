import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { CustomTime } from './pipes/custom-time.pipe';

@NgModule({
  declarations: [MenuComponent, CustomTime],
  exports: [MenuComponent, CustomTime],
  imports: [CommonModule],
})
export class SharedModule {}
