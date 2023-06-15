import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  getData(key: string) {
    const data = localStorage.getItem(key) ?? '';
    if (localStorage.getItem(key)) {
      return JSON.parse(data);
    } else {
      return '';
    }
  }

  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
