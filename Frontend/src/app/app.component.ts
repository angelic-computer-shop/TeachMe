import { Component, OnInit } from '@angular/core';
import { SessionsService } from './services/sessions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { LoaderService } from './services/loader.service';
import { NetworkstatusService } from './services/networkstatus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = true;
  isOffline: boolean = false;
  showOfflineMessage: boolean = false;
  offlineMessage: string = '';
  persistantOffLine : string = '';
  showOtherErrorMessage: boolean = false;
  otherErrorMessage: string = '';
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private swUpdate: SwUpdate,
    private loaderService: LoaderService,
    private networkStatusService: NetworkstatusService
  ) {

  }

  showtitleBar(): boolean {
    const isLoginPage = this.router.url === '/login';

    const isRegisterPage = this.router.url === '/register';


    const isLandingPage = this.router.url === '/landing';



    const isHomePage = this.router.url === '/home';


    return !(
      isLoginPage ||
      isRegisterPage ||
      isLandingPage ||
      isHomePage
    );
  }


  showNavBar(): boolean {
    const isLoginPage = this.router.url === '/login';

    const isRegisterPage = this.router.url === '/register';

    const isForgotPassPage = this.router.url === '/forgotpass';

    const isLandingPage = this.router.url === '/landing';

    const isOTPPage = this.router.url === '/otp';

    const isResetPassPage = this.router.url === '/resetpassword';


    return !(
      isLoginPage ||
      isRegisterPage ||
      isLandingPage ||
      isForgotPassPage ||
      isOTPPage ||
      isResetPassPage
    );
  }
  title = 'BankLingo';

  ngOnInit() {

    this.networkStatusService.onlineStatusChanged.subscribe((isOnline) => {
      this.isOffline = !isOnline;
    });

    this.networkStatusService.onlineStatus$.subscribe((isOnline) => {
      if (!isOnline) {
        this.showOfflineMessage = true;
        this.offlineMessage = 'You are currently offline. Please check your network connection.';
        this.persistantOffLine = 'Offline'
      } else {
        this.showOfflineMessage = true;
        this.isOffline = false;
        this.offlineMessage = 'You are back online!';
        setTimeout(() => {
          this.showOfflineMessage = false;
        }, 3000); // Display the message for 3 seconds
      }
    });

    this.networkStatusService.otherErrorNotification().subscribe(() => {
      this.showOtherErrorMessage = true;
      this.otherErrorMessage = 'Something else went wrong. Please try again later.';
      setTimeout(() => {
        this.showOtherErrorMessage = false;
      }, 3000); // Display the message for 3 seconds
    });

    this.loaderService.getLoadingState().subscribe((loading) => {
      this.isLoading = loading; // Update to false when loading is complete
    });
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
}