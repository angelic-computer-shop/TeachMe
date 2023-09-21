import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Users } from 'src/app/types/users';
import { UsersService } from 'src/app/services/users.services';
import { SessionsService } from 'src/app/services/sessions.service';
import Swal from 'sweetalert2';
import { UploadImageService } from 'src/app/services/uploadImage.service';
import { Observable, Observer, catchError, of, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { jsDocComment } from '@angular/compiler';
import { DataformatService } from 'src/app/services/dataformat.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'], 
})
export class EditProfileComponent implements OnInit {
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;
  files: File[] = [];
  user!: any;
  profileForm!: FormGroup;
  selectedImage!: File;
  isLoading = false;
  imageUploaded: any;
  upd: any;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private session: SessionsService,
    private router: Router,
    private uploadService: UploadImageService,
    private titlePage: Title,
    private changeDetectorRef: ChangeDetectorRef,
    private formatter: DataformatService
  ) { }

  ngOnInit() {
    this.titlePage.setTitle('Edit profile');
    // Retrieve the user data from session storage
    this.user = this.session.getLoggedUser();

    this.imagePreviewUrl = this.user.profile_picture;
    // Reset the flag
    this.imageUploaded = false;

    // Check if the user variable contains valid user data before initializing the form
    if (this.user && Object.keys(this.user).length > 0) {
      this.initializeForm();
    } else {
      // Handle the case when the user data is not available
      console.log('User data not found in session storage');
      // You can take appropriate actions, such as redirecting the user to the login page.
    }
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      name: [this.formatter.capitalizeFirstLetter(this.user.name), [Validators.required]],
      surname: [this.formatter.capitalizeFirstLetter(this.user.surname), [Validators.required]],
      age: [this.user.age, Validators.required],
      contact_number: [this.user.contact_number],
      email: [this.user.email, [Validators.required, Validators.email]],
      profile_picture: [this.user.profile_picture || ''],
    });
  }

  onImageSelected(event: any) {
    // Get the selected image from the input field
    this.selectedImage = event.target.files[0];
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];

      // Create a FileReader to read the image and set its preview URL
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;

        // Automatically trigger the upload process here
        this.uploadImage();
      };
    }
  }

  uploadImage(): void {
    if (!this.selectedImage) {
      alert('Please select an image to upload.');
      return;
    }
    //loading state for uploading a picture
    this.isLoading = true;

    this.uploadService.uploadImage(this.selectedImage).subscribe(
      (response: any) => {
        this.isLoading = false;

        // The response should contain the Cloudinary URL
        const profilePictureUrl = response.secure_url;
        console.log(response, 'successfully uploaded on cloudinary');
        console.log(profilePictureUrl);
        this.imageUploaded = true;
        //Create a new FormControl instance for profile_picture and update it with the Cloudinary URL
        const profilePictureControl = new FormControl(profilePictureUrl);

        // Update the profileForm with the new FormControl instance
        this.profileForm.setControl('profile_picture', profilePictureControl);

        // Update the form value for profile_picture
        this.profileForm.patchValue({ profile_picture: profilePictureUrl });
      },
      (error: any) => {
        console.error('Error uploading profile picture:', error);
      }
    );
  }


  updateUser() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;
      console.log(updatedData);

      if (!this.user.userId) {
        console.error('User ID is not defined.' + this.user.userId);
        return;
      }

      console.log('Updating profile with ID:', this.user.userId);
      console.log('Updated data:', updatedData);

      this.usersService
        .updateProfile(this.user.userId, updatedData)
        .pipe(
          tap((res) => {
            // Merge the updatedData with the existing user object
            this.user = { ...this.user, ...res };

            // Save the updated user data to session storage
            this.session.updateUserProfile(updatedData)
            
            // Log the updated user data for verification
            console.log('User data saved to session:', this.user);

            // Print the user data directly from session storage
            const storedUserData = this.session.getLoggedUser();
            console.log('User data retrieved from session:', storedUserData);

            this.changeDetectorRef.detectChanges(); // Manually trigger change detection
          }),
          catchError((error) => {
            console.error('Error updating profile:', error);
            return of(null); // Emit an empty observable to continue the observable chain
          })
        )
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Profile Updated Successfully!',
            confirmButtonColor: '#38A3A5',
            showConfirmButton: false,
            timer: 1400,
          }).then((result) => {
           
          });
           // Reload the page
           window.location.reload();
        });
    }
  }


}