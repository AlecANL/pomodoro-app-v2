import { Component, OnInit } from '@angular/core';
import { IMenuOptions } from '@shared/models/menu.interface';

@Component({
  selector: 'nav-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menuOptions: IMenuOptions[] = [
    {
      name: 'pomodoro',
      value: 'pomodoro',
    },
    {
      name: 'short break',
      value: 'shortBreak',
    },
    {
      name: 'long break',
      value: 'longBreak',
    },
  ];
  activeTab: string = 'pomodoro';

  constructor() {}

  ngOnInit(): void {}

  handleTabChange(tab: string) {
    this.activeTab = tab;
  }
}
