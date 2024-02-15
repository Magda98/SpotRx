import {
  CreateQueryOptions,
  QueryKey,
} from '@tanstack/angular-query-experimental';
import { Observable, firstValueFrom, fromEvent, takeUntil } from 'rxjs';

export function createQuery<TData, TQueryKey extends QueryKey>(
  queryKey: TQueryKey,
  query: Observable<TData>
) {
  return {
    queryKey,
    queryFn: ({ signal }) =>
      firstValueFrom(query.pipe(takeUntil(fromEvent(signal, 'abort')))),
  } satisfies CreateQueryOptions<TData>;
}
