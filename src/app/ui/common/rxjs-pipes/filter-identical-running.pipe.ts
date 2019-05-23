import { isEqual } from 'lodash';
import { Observable, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export function filterIdenticalRunning<T = any>(compareFunction = isEqual): OperatorFunction<T, T> {
  let lastValue: T | null = null;

  return (source: Observable<T>) => source
    .pipe(
      filter<T>(value => !compareFunction(value, lastValue)),
      map(value => lastValue = value),
    );
}
