import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SaveStorage {
  onSaveStorage<T = any>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  onGeToStorage<T = any>(key: string): T | null {
    return JSON.parse(localStorage.getItem(key) as string) || null;
  }
}
