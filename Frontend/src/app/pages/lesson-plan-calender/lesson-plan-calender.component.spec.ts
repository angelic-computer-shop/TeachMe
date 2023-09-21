import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPlanCalenderComponent } from './lesson-plan-calender.component';

describe('LessonPlanCalenderComponent', () => {
  let component: LessonPlanCalenderComponent;
  let fixture: ComponentFixture<LessonPlanCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonPlanCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonPlanCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
