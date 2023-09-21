import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-lesson-plans',
  templateUrl: './lesson-plans.component.html',
  styleUrls: ['./lesson-plans.component.scss'],
})
export class LessonPlansComponent implements OnInit {
  isLoading: boolean = false;
  user_id = this.session.getLoggedUser().userId;
  allPlans: any[] = [];
  percentComplete: number[] = [];
  progressStatus: string[] = [];
  buttonProgress: string[] = [];

  constructor(
    private titlePage: Title,
    private core: CoreService,
    private session: SessionsService
  ) {}

  ngOnInit(): void {
    this.titlePage.setTitle('Lesson plans');

    this.isLoading = true;
    this.core.getAllUserLessons(this.user_id).subscribe((data) => {
      this.isLoading = false;
      this.allPlans = data;
      this.allPlans.forEach((element) => {
        const percent = (element.days_count / element.duration) * 100;
        switch (percent) {
          case 0:
            this.progressStatus.push('Not started');
            break;
          case 100:
            this.progressStatus.push('Completed');
            break;
          default:
            this.progressStatus.push('In progress');
            break;
        }

        this.percentComplete.push(
          (element.days_count / element.duration) * 100
        );
      });
    });
  }

  //removing the lesson plan
  removeLesson(planId: number) {
    // Assuming you have a service to handle unfavorite logic
    this.core.removeLessonPlan(planId).subscribe((response) => {
      // Handle the response if needed
      // For example, you can remove the unfavored search from the list or update the UI.
      // Here, we remove the search from favoutitesArray
      this.allPlans = this.allPlans.filter((plan) => plan.id !== planId);
      window.location.reload();
    });
  }
}
