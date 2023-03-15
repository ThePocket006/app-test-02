import { TestBed } from '@angular/core/testing';

import { PayloadResolverResolver } from './payload-resolver.resolver';

describe('PayloadResolverResolver', () => {
  let resolver: PayloadResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PayloadResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
