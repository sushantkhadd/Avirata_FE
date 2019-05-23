import { TestBed } from '@angular/core/testing';

import { Module0Service } from './module0.service';

describe('Module0Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Module0Service = TestBed.get(Module0Service);
    expect(service).toBeTruthy();
  });
});
