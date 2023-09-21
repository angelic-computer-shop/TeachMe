/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NetworkstatusService } from './networkstatus.service';

describe('Service: Networkstatus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkstatusService]
    });
  });

  it('should ...', inject([NetworkstatusService], (service: NetworkstatusService) => {
    expect(service).toBeTruthy();
  }));
});
