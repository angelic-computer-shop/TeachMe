import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordServiceService } from 'src/app/services/password-service.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { UsersService } from 'src/app/services/users.services';
import { Users } from 'src/app/types/users';
import Swal from 'sweetalert2';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  providers: [SessionsService]
})
export class OtpComponent implements OnInit{
  private countdownSub!: Subscription;

public email!: string;
public otp!: number;
public otpSent = false;
number1!: string;
isInvalidOTP = false;
user!:Users;
remainingTime = 60
isResendDisabled=false


constructor(
  private route: ActivatedRoute,
  private router: Router,
  private userService: UsersService,
  private sessions : SessionsService,
  private password : PasswordServiceService,
  private titlePage : Title
) {}

ngOnInit(): void {
  this.titlePage.setTitle("OTP")
this.countdown()


}


countdown() {
  const targetSeconds = 30; // 30 seconds
     this.remainingTime = targetSeconds;

    this.countdownSub = interval(1000).subscribe(() => {

      if (this.remainingTime <= 0) {
        this.countdownSub.unsubscribe();
        this.isResendDisabled=true
      }

      this.remainingTime--;
    });

}

verifyOtp() {
//function used to verify the otp that was sent to the email.
const emailOTP: number = this.otp
if(emailOTP==this.sessions.getEmailOTP().number){
  this.router.navigate(["/resetpassword"])
}else{
  Swal.fire({
    icon: 'error',
    title: 'Incorrect OTP',
    text: 'Please enter correct OTP sent to your email',
    showConfirmButton: false,
    timer: 3000
  }).then((result) => {
   
  });
}
}

// resends the otp to the email provided incease the response was not received previously
resendOtp() {
const email = this.sessions.getEmailOTP().email

  this.password.sendOtp(email).subscribe( response =>{
    this.isResendDisabled=false
    this.countdown()
    
})
}
}