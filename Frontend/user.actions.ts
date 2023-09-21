// user-profile.actions.ts
import { createAction, props } from '@ngrx/store';
import { UserProfile } from './user-profile.state';

export const setUserProfile = createAction(
  '[User Profile] Set User Profile',
  props<{ profile: UserProfile }>()
);

export const clearUserProfile = createAction('[User Profile] Clear User Profile');
