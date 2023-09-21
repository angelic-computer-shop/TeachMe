import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { Users } from 'src/app/types/users';
import { UsersService } from 'src/app/services/users.services';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LessonPlan } from 'src/app/types/lessonPlan';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})

export class ProgressComponent implements OnInit {

  lessonsWithZeroProgress: any[] = [];
  zeroProgressCount: number = 0;
  startedProgressCount: number = 0;
  countTaskCompleted: number = 0;


  progressValue = 0;
  days_count = 0;
  duration = 0;

  processedData: any[] = [];
  //Variables for progress bar
  progressWidth = 0;
  ariaValueNow = 0;
  ariaValueMin = 0;
  ariaValueMax = 100;

  lessonCount: number = 0;



  user!: any;
  plan!: any;
  lessonss!: any;
  profileForm!: FormGroup;
  loggedUser: Users | undefined
  name: string | undefined
  surname: string | undefined
  img: string | undefined


  user_id = 0
  plan_id = 0

  constructor(private session: SessionsService,
    private core: CoreService,
    private titlePage: Title,
  ) { }


  ngOnInit(): void {
    this.titlePage.setTitle("Progress")
    this.user_id = this.session.getLoggedUser().userId
    this.user = this.session.getLoggedUser();

    this.processData()

  }

  processData() {
    this.core.getAllUserLessons(this.user_id).subscribe(dataResponse => {
      this.progressWidth = dataResponse.progress;
      this.ariaValueNow = this.progressWidth;
      this.lessonCount = dataResponse.length


      dataResponse.forEach((data: any) => {
        const duration = data.duration;
        const plan_name = data.plan_name
        const progressValue = (data.days_count / duration) * 100;
        this.processedData.push({ progressValue, data, duration, plan_name });


        switch (progressValue) {
          case 0:
            this.lessonsWithZeroProgress.push(data);
            this.zeroProgressCount++;
            break;
          case 100:
            this.lessonsWithZeroProgress.push(data);
            this.countTaskCompleted++;

            break;
          default:
            this.lessonsWithZeroProgress.push(data);
            this.startedProgressCount++;
            break;

        }


      });
    });
  }

}


