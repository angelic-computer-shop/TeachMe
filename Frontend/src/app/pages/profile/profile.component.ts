import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.services';
import { Router } from '@angular/router';


import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { Users } from 'src/app/types/users';

import { HttpClient } from '@angular/common/http';
import { SessionsService } from 'src/app/services/sessions.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

const URL = 'http://localhost:4500';

@Component({
  selector: 'app-profile',

  template: `
  <div *ngIf="UsersService.isLoggedIn()">
    <!-- Your application content here -->
    <button (click)="logout()">Logout</button>
  </div>
  <div *ngIf="!UsersService.isLoggedIn()">
    <!-- Show login page or redirect to login page -->
  </div>`,

  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user!: any;
  profileForm!: FormGroup;


  progressValue = 35;
  maxValue = 100;
  constructor(
    private usersService: UsersService,
    private router: Router, private formBuilder: FormBuilder,
    private session: SessionsService,
    private titlePage: Title
  ) { }



  ngOnInit() {
    // Retrieve the user data from session storage
    this.user = this.session.getLoggedUser();
    this.titlePage.setTitle("Profile");
    

    // Check if the user variable contains valid user data before initializing the form
    if (this.user && Object.keys(this.user).length > 0) {
      this.initializeForm();
    } else {
      // Handle the case when the user data is not available
      console.log('User data not found in session storage');
      // You can take appropriate actions, such as redirecting the user to the login page.
    }
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
      age: [this.user.age, Validators.required],
      contact_number: [this.user.contact_number],
      email: [this.user.email, [Validators.required, Validators.email]],
      profile_picture: [this.user.profile_picture],
    });
  }

  // Update the progressValue as needed (e.g., based on an event or timer)
  updateProgress() {
    this.progressValue += 10;
    if (this.progressValue > this.maxValue) {
      this.progressValue = this.maxValue;
    }
  }

  logout() {
    this.usersService.logout();
    this.router.navigate(['/login']); // Redirect the user to the login page
  }

}