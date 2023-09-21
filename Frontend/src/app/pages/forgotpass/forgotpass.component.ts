import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { response } from 'express';
import { PasswordServiceService } from 'src/app/services/password-service.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { UsersService } from 'src/app/services/users.services';
import { Users } from 'src/app/types/users';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit{

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  email!: string;
  generatedOTP!:number;
  user!:Users;
  emailOTP! : number

  constructor(private router: Router, private userService: UsersService,
     private sessions : SessionsService, 
     private passwordService: PasswordServiceService,  
     private titlePage : Title) {}

  ngOnInit(): void {
  this.titlePage.setTitle("Forgot Password")
    
  }


  
  
  
  
  
  
  onSubmit(){
    //function will be initialized when pressing the submit button
    const { email } = this.form.value;

   // setTimeout(() =>  this.gotoOtp() , 1000);


    this.passwordService.sendOtp(email).subscribe( response =>{


        this.sessions.saveEmailOTP(response);
       
        
       this.router.navigate(["/otp"])
    })
  }

//sending otp function
  sendOtp() {

    const email = this.form.get('email')?.value;
    if (email) {
      // Ensure email is not null or undefined before making the API call
      console.log(email);
    this.passwordService.sendOtp(email).subscribe(
      res => {
        console.log(res,"this one");
        
        // OTP sent successfully, handle success or redirect to OTP component
       // this.router.navigateByUrl('/otp?email=' + encodeURIComponent(email));
      },
      (error) => {
        // Handle error (e.g., show error message)
      }

    );
  }
  }
  
  }
