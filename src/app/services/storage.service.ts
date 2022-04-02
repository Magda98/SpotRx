import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

   getData(key: string): any {
      const data = localStorage.getItem(key) ?? "[]";
      return JSON.parse(data);
    }
  
  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
