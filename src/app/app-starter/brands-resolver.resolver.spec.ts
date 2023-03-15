import { TestBed } from '@angular/core/testing';

import { BrandsResolverResolver } from './brands-resolver.resolver';

describe('BrandsResolverResolver', () => {
  let resolver: BrandsResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BrandsResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
