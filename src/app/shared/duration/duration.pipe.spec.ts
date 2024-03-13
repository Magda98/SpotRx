import { TestBed } from '@angular/core/testing';
import { DurationPipe } from '../duration/duration.pipe';

describe('DurationPipe', () => {
  test('should render', () => {
    TestBed.configureTestingModule({
      providers: [DurationPipe],
    });
    const pipe = TestBed.inject(DurationPipe);
    expect(pipe.transform(186191)).toEqual('3:06');
    expect(pipe.transform(139320)).toEqual('2:19');
  });
});
