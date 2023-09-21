import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  private cloudinaryUrl =
    'https://api.cloudinary.com/v1_1/dbdhrolar/image/upload';
  private cloudinaryUploadPreset = 'u7pphfwg';

  constructor(private http: HttpClient) {}

  //Uploads an image file to Cloudinary using the provided file and Cloudinary upload preset.
  uploadImage(file: File): Observable<any> {
    // Create a new FormData object to prepare the data for the HTTP request.
    const formData = new FormData();
    // Append the image file to the FormData.
    formData.append('file', file);
    // Append the Cloudinary upload preset.
    formData.append('upload_preset', this.cloudinaryUploadPreset);

    // Make an HTTP POST request to the Cloudinary URL with the FormData containing the image and upload preset.
    return this.http.post(this.cloudinaryUrl, formData);
  }
}
