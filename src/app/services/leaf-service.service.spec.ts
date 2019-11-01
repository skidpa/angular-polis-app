import { TestBed } from '@angular/core/testing';

import { LeafServiceService } from './leaf-service.service';

describe('LeafServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeafServiceService = TestBed.get(LeafServiceService);
    expect(service).toBeTruthy();
  });
});
