import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { W } from '@fullcalendar/core/internal-common';
import { CoreService } from 'src/app/services/core.service';
import { SharedService } from 'src/app/services/shared.service';
import { Lesson, Welcome } from 'src/app/types/TopicsIE';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent {
  //Variables declared with their types for type-safe development
  topics: Welcome[] = [];
  course?: any[] = [];
  localTopics: any;
  localParse!: Welcome;
  coveredStatus: boolean = false;
  isLoading: boolean = false;
  coveredStatusArray: boolean[] = [true];
  activePlanId = 0;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private core: CoreService,
    private titlePage: Title
  ) {
    this.sharedService.cardCoveredStatus$.subscribe((status) => {
      this.coveredStatus = status;
    });
  }
  ngOnInit() {
   
    this.titlePage.setTitle('Topics');
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.activePlanId = params['plan_id'];
    });
    
    //When you get to the page, this getsTopics based on the plan_id
    this.core.getTopicsByIdAndCache(this.activePlanId).subscribe({
      next: (data: any) => {
        // Instead of storing in localStorage, you can directly process the data here
        const topicsData = data as unknown as Welcome; // Assuming Welcome is the type of your data
        this.course = topicsData.topic_description?.course.lessons;
        this.isLoading = false;

        // As soon as the topics are returned, the topics are going to be stored on localStorage
        localStorage.setItem('topics', JSON.stringify(data));
        console.log(this.course);
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    //This code takes the day from the route
    const routeParam = this.route.snapshot.paramMap;
    const routeId = String(routeParam.get('day'));
  }
}