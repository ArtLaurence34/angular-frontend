import { TestBed } from '@angular/core/testing';

import { FakeBackend } from './fake-backend';

describe('FakeBackend', () => {
  let service: FakeBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeBackend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
