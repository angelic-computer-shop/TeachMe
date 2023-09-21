import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoaderInterceptorInterceptor } from './loader-interceptor.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { BottomNavBarComponent } from './components/bottom-nav-bar/bottom-nav-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PromptComponentComponent } from './components/prompt-component/prompt-component.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ForgotpassComponent } from './pages/forgotpass/forgotpass.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LessonPlanCalenderComponent } from './pages/lesson-plan-calender/lesson-plan-calender.component';
import { LessonPlansComponent } from './pages/lesson-plans/lesson-plans.component';
import { LoginComponent } from './pages/login/login.component';
import { OtpComponent } from './pages/otp/otp.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SingleComponent } from './pages/single/single.component';
import { TestingComponent } from './pages/testing/testing.component';
import { TopicContentComponent } from './pages/topic-content/topic-content.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { PwaService } from './services/pwa.service';
import { LoaderComponent } from './components/loader/loader.component';
import { CardLoaderComponent } from './components/card-loader/card-loader.component';
import { NetworkstatusService } from './services/networkstatus.service';
import { OfflineComponent } from './components/offline/offline.component';


//  const initializer = (pwaService: PwaService) => () =>
// pwaService.initPwaPrompt();


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TopicsComponent,
    ForgotpassComponent,
    OtpComponent,
    LessonPlansComponent,
    TopicContentComponent,
    ProgressComponent,
    ProfileComponent,
    EditProfileComponent,
    NavBarComponent,
    BottomNavBarComponent,
    LandingComponent,
    LessonPlanCalenderComponent,
    SearchBarComponent,
    ResetPasswordComponent,
    HomeComponent,
    TitleBarComponent,
    PromptComponentComponent,
    TestingComponent,
    SingleComponent,
    LoaderComponent,
    CardLoaderComponent,
    OfflineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatBottomSheetModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatSnackBarModule, // Import MatSnackBarModule
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
     // registrationStrategy: 'registerWhenStable:30000',
    }),
  ],

  providers: [
  // {
  //    provide: APP_INITIALIZER,
  //    useFactory: initializer,
  //    deps: [PwaService],
  //   multi: true,
  // },
  NetworkstatusService
 ],
  bootstrap: [AppComponent],
})
export class AppModule {}
