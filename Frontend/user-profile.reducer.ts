// user-profile.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { UserProfileState } from './user-profile.state';
import * as UserProfileActions from './user.actions';

const initialState: UserProfileState = {
  user: null
};

export const userProfileReducer = createReducer(
  initialState,
  on(UserProfileActions.setUserProfile, (state, { profile }) => ({ ...state, user: profile })),
  on(UserProfileActions.clearUserProfile, state => ({ ...state, user: null }))
);
