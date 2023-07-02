import { BehaviorSubject, Observable, delay, finalize } from 'rxjs';

export abstract class LoaderBaseService {
  isLoading = new BehaviorSubject(false);
  // delay time before setting isLoading to true, to prevent flasing skeleton loader
  loaderDelay = 100;

  getDataWithLoader<T>(getData: Observable<T>) {
    this.isLoading.next(true);
    return getData.pipe(
      delay(this.loaderDelay),
      finalize(() => {
        this.isLoading.next(false);
      })
    );
  }
}
