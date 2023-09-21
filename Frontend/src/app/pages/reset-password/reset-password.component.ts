import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as e from 'express';
import { PasswordServiceService } from 'src/app/services/password-service.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { UsersService } from 'src/app/services/users.services';
import { Users } from 'src/app/types/users';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
 
  
  form!: FormGroup<any>;
  user!:Users;
  

  newPassword!: string;

constructor(private formBuilder: FormBuilder,
  
  private passwordService: PasswordServiceService,
   
  private userService: UsersService,
    private router:Router,
     private sessions: SessionsService,
     private titlePage : Title,
  
    
  )  {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(12), this.passwordPatternValidator]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  
  ngOnInit(): void {
    this.titlePage.setTitle("Reset password")
    this.user = this.sessions.getOTP();
  }

  onSubmit() {
    if (this.form.valid) {

      if (!this.user.user_id) {
        console.error('User ID is not defined.' + this.user.user_id);
        return;
      }
      
      //when the new password is recieved, it will redirect.
      const newPassword = this.form.get('password')?.value;
      // Call the password service to perform the password change/reset logic
      this.passwordService.changePassword(newPassword,this.user.user_id).subscribe(
        response => {
          // Handle the response or show success message
          this.router.navigate(['/resetpassword'])
        },
        (error) => {
          // Handle error response or show error message
          console.error('Password change failed:', error);
        }
      );
    }
  }


  //user is changing their password function
  changePassword() {
    const search = {
      password: this.form.get('password')?.value
    }

    const uId = this.sessions.getEmailOTP().user
    
    this.passwordService.resetPassword(uId,search).subscribe(response => {
      this.router.navigate(["/login"])
      
        // Password changed successfully, handle success or redirect to login page
      },
      (error) => {
        // Handle error (e.g., show error message)
      }
    );
  }


  // Custom validator to check password pattern
  private passwordPatternValidator(control: any) {
    const password = control.value;
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return { invalidPattern: true };
    }
    return null;
  }

  // Custom validator to check if passwords match
  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
