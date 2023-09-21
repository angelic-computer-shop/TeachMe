/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataformatService } from './dataformat.service';

describe('Service: Dataformat', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataformatService]
    });
  });

  it('should ...', inject([DataformatService], (service: DataformatService) => {
    expect(service).toBeTruthy();
  }));
});
