import { Injectable } from '@angular/core';

import { LessonPlan } from '../types/lessonPlan';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loggedUser } from '../types/LoggedUser';
import { SessionsService } from './sessions.service';

@Injectable({
  providedIn: 'root'
})
export class LessonPlaService {

  accessToken: any;
  user!: loggedUser;
  private lessonPlans: LessonPlan[] = [];


  private getHeaders(): HttpHeaders {
    this.accessToken = sessionStorage.getItem('loggedUser');
    this.user = JSON.parse(this.accessToken) as loggedUser;
    if (!this.user) {
      console.log('There is no user');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.user.token}`,
      'Content-Type': 'application/json',
    });
    return headers;
  }

  
  constructor(private http: HttpClient, public storage: SessionsService) {}




  }


  
  

