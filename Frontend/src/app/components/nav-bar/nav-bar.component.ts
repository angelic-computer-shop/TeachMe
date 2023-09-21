import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SessionsService } from 'src/app/services/sessions.service';
import { PwaService } from 'src/app/services/pwa.service';
import { SwUpdate } from '@angular/service-worker';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  onProfile=false
  constructor(private router: Router,
     private location : Location, 
     private titlePage : Title, 
     private session : SessionsService,
     private pwa : PwaService,
     private swUpdate : SwUpdate
     ) { } 
     
     ngOnInit(): void {}

  // A method that retrieves the title from another service using "getTitle()"
  // Returns the title as a string
  showTitle(): string {
    return this.titlePage.getTitle()
  }

  isProfilePage(): boolean{
    const isProfilePage = this.router.url === '/profile';
    return ( isProfilePage );
  }

  logout(){
    this.session.clean()
    this.router.navigate(["/login"])
  }

  installAsApp(){
    this.pwa.initPwaPrompt()

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (
          confirm(
            "You're using an old version of the control panel. Want to update?"
          )
        ) {
          window.location.reload();
        }
      });
    }
  }

// Function to navigate back to the previous page
  navigateBack(): void {
    // Utilize the "location" service to navigate back
    this.location.back()
    // this.router.navigate(['/']); // Navigate back to the previous page
  }

}