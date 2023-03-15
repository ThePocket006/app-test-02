import { TestBed } from '@angular/core/testing';

import { MediaResolver } from './media.resolver';

describe('MediaResolver', () => {
  let resolver: MediaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MediaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
