import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BottomNavBarComponent } from './components/bottom-nav-bar/bottom-nav-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ForgotpassComponent } from './pages/forgotpass/forgotpass.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LessonPlansComponent } from './pages/lesson-plans/lesson-plans.component';
import { LoginComponent } from './pages/login/login.component';
import { OtpComponent } from './pages/otp/otp.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { RegisterComponent } from './pages/register/register.component';
import { TopicContentComponent } from './pages/topic-content/topic-content.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { LessonPlanCalenderComponent } from './pages/lesson-plan-calender/lesson-plan-calender.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { AuthGuard } from './auth.guard';
import { TestingComponent } from './pages/testing/testing.component';
import { SingleComponent } from './pages/single/single.component';


const routes: Routes = [
  {
    path: 'edit_profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'forgotpass', component: ForgotpassComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'landing', component: LandingComponent },
  {
    path: 'lesson-plan-calender',
    component: LessonPlanCalenderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'lesson-plans',
    component: LessonPlansComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'progress', component: ProgressComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'topic_content', component: TopicContentComponent, canActivate: [AuthGuard] },
  { path: 'topics', component: TopicsComponent, canActivate: [AuthGuard] },
  { path: 'nav-bar', component: NavBarComponent },
  { path: 'topics', component: TopicsComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchBarComponent, canActivate: [AuthGuard] },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'testing/:plan_id', component: TestingComponent },
  { path: 'singletopic/:day', component: SingleComponent },

   { path: '', redirectTo: 'landing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
