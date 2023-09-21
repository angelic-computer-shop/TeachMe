import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordServiceService {
  private apiUrls1 = 'https://banklingoapi.onrender.com';
  private apiUrls = 'http://localhost:3000';
 
 
  constructor(private http: HttpClient) {}


 
  
  // Method to change the user's password
  changePassword(newPassword: string,id:any) {
    const requestBody = { newPassword: newPassword };
    // Replace 'post' with the appropriate HTTP method (e.g., 'put', 'patch', etc.) for your API
    return this.http.post(`${this.apiUrls1}api/user/passwordReset/${id}`, requestBody);
  }

  sendOtp(email:any) {
    return this.http.post(`${this.apiUrls1}/api/user/sendOTP`,  { email :email});
  }

  verifyOtp(email: string, otp: number) {
    return this.http.post(`${this.apiUrls}/verify`, { email, otp });
  }

  resendOtp(email: string) {
    return this.http.post(`${this.apiUrls}/resend`, { email });
  }


   
  resetPassword(user_id: number, search: { password: string}): Observable<any> {
    // return this.http.post(`${this.apiUrls}/api/gpt`, prompt).pipe(
      return this.http.post(`https://banklingoapi.onrender.com/api/user/passwordReset/${user_id}`, search).pipe(

      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      })
    );
  }

}

