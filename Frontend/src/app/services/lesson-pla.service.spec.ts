import { TestBed } from '@angular/core/testing';

import { LessonPlaService } from './lesson-pla.service';

describe('LessonPlaService', () => {
  let service: LessonPlaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonPlaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
