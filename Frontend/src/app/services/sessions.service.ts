import { Injectable } from '@angular/core';


const LOGGED_USER = "loggedUser"
const IS_LOGGED = true
const OTP = "otp"
const QUERY_RESPONSE = "query_response"
const QUERY_QUESTION = "query_question"
const UPDATE_USER = "UPDATE_USER_BOOLEAN"
const SAVE_OTP="save_otp"


@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor() {

   }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveLoggedUser(user: any): void {
    window.sessionStorage.removeItem(LOGGED_USER);
    window.sessionStorage.setItem(LOGGED_USER, JSON.stringify(user));
  }





public saveOTP(otpObject: { number: any } | null): void {
  if (otpObject !== null) {
    window.sessionStorage.setItem(OTP, JSON.stringify(otpObject));
  } else {
    window.sessionStorage.removeItem(OTP);
  }
}

  


  public saveEmailOTP(otp: any): void {
    window.sessionStorage.removeItem(SAVE_OTP);
    window.sessionStorage.setItem(SAVE_OTP, JSON.stringify(otp));
  }
  

  public saveQueryResponse(message: any): void {
    window.sessionStorage.removeItem(QUERY_RESPONSE);
    window.sessionStorage.setItem(QUERY_RESPONSE, JSON.stringify(message));
  }

  public saveQueryQuestion(question: any): void {
    window.sessionStorage.removeItem(QUERY_QUESTION);
    window.sessionStorage.setItem(QUERY_QUESTION, JSON.stringify(question));

  }

  public isLogged(isLogged: boolean): void {
    window.sessionStorage.removeItem(LOGGED_USER);
    window.sessionStorage.setItem(LOGGED_USER, JSON.stringify(isLogged));
  }

  

  public getLoggedUser(): any {
    const song = window.sessionStorage.getItem(LOGGED_USER);

    if (song) {
      return JSON.parse(song);
    }

    return {};
  }
 
  public getEmailOTP(): any {
    const otp = window.sessionStorage.getItem(SAVE_OTP);

    if (otp) {
      return JSON.parse(otp);
    }

    return {};
  }
  // public getOTP(): string {
  //   const otp = window.sessionStorage.getItem(OTP);
  //   return otp || ''; // Return an empty string if OTP is not found in sessionStorage
  // }

  // public getOTP(): { number: number } | null {
  //   const otp = window.sessionStorage.getItem(OTP);

  //   if (otp) {
  //     return JSON.parse(otp);
  //   }

  //   return null;
  // }

  
  
  public getOTP(): any {
    const otp = window.sessionStorage.getItem(OTP);
  
    if (otp) {
      return JSON.parse(otp);
    }
  
    return null;
  }
  
 


  public getQueryResponse(): any {
    const response = window.sessionStorage.getItem(QUERY_RESPONSE);

    if (response) {
      return JSON.parse(response);
    }

    return {};
  }
 
  public getQueryQuestion(): any {
    const question = window.sessionStorage.getItem(QUERY_QUESTION);

    if (question) {
      return JSON.parse(question);
    }

    return {};
  }

  public updateUserFirstTimeSearch(){
   const updateObj = this.getLoggedUser()
   updateObj.searchedbefore = true;
   const updatedObjectString = JSON.stringify(updateObj);
   sessionStorage.setItem(LOGGED_USER, updatedObjectString);
   // window.location.reload()
   
  }

  public updateUserProfile(updatedData: any) {
    const existingUserData = this.getLoggedUser();
  
    // Merge the existing user data with the updatedData
    const updatedUserData = { ...existingUserData, ...updatedData };
  
    const updatedUserDataString = JSON.stringify(updatedUserData);
    sessionStorage.setItem(LOGGED_USER, updatedUserDataString);
    console.log(updatedUserDataString);
  }
  
 
 

}
