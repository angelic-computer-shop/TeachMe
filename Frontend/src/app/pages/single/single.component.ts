import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { da } from 'date-fns/locale';
import { CoreService } from 'src/app/services/core.service';
import { SharedService } from 'src/app/services/shared.service';
import { Welcome, Lesson } from 'src/app/types/TopicsIE';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})
export class SingleComponent {
  topics: Welcome[] = [];
  course: Lesson[] = [];
  localTopics: any;
  localParse!: Welcome;
  particularDay: Lesson[] = [];
  someTopics: any;
  currentIndex: number = 0;
  Message: string = ' ';
  loading: boolean = false;
  doneClicked: boolean = false;

  allTopicsCoveredForCard: boolean = false;

  // ...

  onDoneClicked() {
    this.doneClicked = true;
    this.navigateToNextTopic(); // Call the main function to trigger the update
  }
  constructor(
    private route: ActivatedRoute,
    private core: CoreService,
    private sharedService: SharedService,
    private router: Router,
    private titlePage: Title
  ) { }
  ngOnInit() {
    this.titlePage.setTitle('Chapters');
    //Get the current paramenter
    const routeParam = this.route.snapshot.paramMap;
    const routeId = String(routeParam.get('day'));
    this.localTopics = localStorage.getItem('topics');

    this.localParse = JSON.parse(this.localTopics) as Welcome;
    // Put the data into a variable.
    this.course = this.localParse.topic_description?.course.lessons;

    //Loop through the course
    this.course.forEach((item) => {
      if (item.day === routeId) {
        this.particularDay.push(item);
      }
    });
    // Topics under a certain lesson plan, as an array
    this.someTopics = this.particularDay[0].topics;

    //Create an object to be sent over to the request
    let message = {
      message: this.someTopics[0],
    };
    // Start spinner

    this.loading = true;

    this.core.askGPTinsideTopic(message).subscribe({
      next: (data) => {
        this.Message = data.message;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  async incrementDays() {
    this.localTopics = localStorage.getItem('topics');
    this.localParse = JSON.parse(this.localTopics) as Welcome;
    await this.core.incrementDays(this.localParse.plan_id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async navigateToNextTopic(): Promise<void> {
    this.loading = true;
    if (this.currentIndex < this.someTopics.length - 1) {
      this.currentIndex++;
      let message = {
        message: this.someTopics[this.currentIndex],
      };
      console.log(message);

      await this.core.askGPTinsideTopic(message).subscribe({
        next: (data) => {
          this.Message = data.message;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
    }

    if (this.currentIndex === this.someTopics.length - 1) {
      this.allTopicsCoveredForCard = true;
      this.sharedService.setCardCoveredStatus(true);

      // Update the covered status in the course array
      this.course.forEach(async (lesson) => {
        if (lesson.day === this.particularDay[0].day) {
          this.localTopics = localStorage.getItem('topics');

          this.localParse = JSON.parse(this.localTopics) as Welcome;

          lesson.covered = true;
          let day = {
            day: lesson.day,
          };

          if (this.doneClicked) {
            await this.core
              .updateCovered(this.localParse.plan_id, day)
              .subscribe({
                next: async (data) => {
                  await this.incrementDays();
                  this.router.navigate([`/testing/${this.localParse.plan_id}`]);
                },
                error: (err) => {
                  console.log(err);
                },
              });
          }
        }
      });
    }
  }

  splitMessage(message: string): string {
    const words = message.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + ' ' + word).length <= 60) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }

    lines.push(currentLine);

    return lines.join('<br>'); // Join lines with line breaks
  }

  async navigateToPreviousTopic(): Promise<void> {
    this.loading = true;
    if (this.currentIndex > 0) {
      this.currentIndex--;
      let message = {
        message: this.someTopics[this.currentIndex],
      };

      await this.core.askGPTinsideTopic(message).subscribe({
        next: (data) => {
          this.Message = data.message;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
    }
    this.allTopicsCoveredForCard = false;
  }
}