import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	getData(key: string) {
		const data = localStorage.getItem(key) ?? '';
		if (localStorage.getItem(key)) {
			return JSON.parse(data);
		} else {
			return '';
		}
	}

	setData(key: string, data: unknown): void {
		localStorage.setItem(key, JSON.stringify(data));
	}

	removeData(key: string) {
		localStorage.removeItem(key);
	}
}
