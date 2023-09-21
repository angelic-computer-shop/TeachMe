export interface UserProfileState {
    user: UserProfile | null;
  }

export interface UserProfile {
    token: any;
    user_id: number;
    name?: string;
    surname?: string;
    age?: number;
    email: string;
    password?: string;
    contact_number?: string;
    profile_picture?: string;
    created_date?: Date;
    updated_date?: Date;

}