import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionsService } from 'src/app/services/sessions.service';
import { UsersService } from 'src/app/services/users.services';
import { Users } from 'src/app/types/users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  users!: Users;
  email!: string;
  invalidForm = false;
  isLoading = false;
  invalidCredentials: any;
  isLoadingAsGuest: boolean = false;

  constructor(
    private auth: UsersService,
    private router: Router,
    private formB: FormBuilder,
    private session: SessionsService
  ) {
    this.loginForm = this.formB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  password: string = '';
  showPassword: boolean = false;

  //show password after typing it to show the typed password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
    this.invalidForm = false;
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Form is valid, perform login
      this.isLoading = true;
      this.auth.login(this.loginForm.value).subscribe(
        (response) => {
          this.isLoading = false;
          // Handle the successful response here.
          console.log(response, 'success');
          this.session.saveLoggedUser(response);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'Successfully logged in.',
            confirmButtonColor: '#38A3A5',
            showConfirmButton: false,
            timer: 1400,
          }).then((result) => {
            this.router.navigate(['/home']);
            if (result.value) {
            }
          });
        },
        (error) => {
          // Handle the error here or display it to the user.
          this.isLoading = false;
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'User not found',
            text: 'Please enter correct credentials.',
            confirmButtonColor: '#38A3A5',
          });
        }
      );
    } else {
      this.invalidForm = true;
      window.location.reload;
    }
  }

  loginAsGuest() {
    this.isLoadingAsGuest = true;
    let userObject = {
      email: 'tester@gmail.com',
      password: 'Tester@123',
    };
    console.log(userObject);
    this.auth.login(userObject).subscribe({
      next: (data) => {
        this.isLoadingAsGuest = false;
        this.session.saveLoggedUser(data);
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Logged in as Guest.',
          confirmButtonColor: '#38A3A5',
          showConfirmButton: false,
          timer: 1400,
        }).then((result) => {
          this.router.navigate(['/home']);
        });
      },
      error: (err) => {
        this.isLoadingAsGuest = false;
        Swal.fire({
          icon: 'error',
          title: 'Guest Account cannot be accessed',
          text: 'Network Error',
          confirmButtonColor: '#38A3A5',
        });
      },
    });
  }
}
