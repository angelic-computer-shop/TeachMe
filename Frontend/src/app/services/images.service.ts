import {   HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { cloudinaryConfig } from 'src/cloudinary-config'; 

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
//private cloudinaryApiUrl = `https://<716837615899186:Z5nCMDCFGf5PYUimMJHCzVGdtR4>@api.cloudinary.com/v1_1/<dbdhrolar>/resources/image`;
 private cloudinaryApiUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/resources/image`;
 //private cloudinaryApiUrl = 'https://716837615899186:Z5nCMDCFGf5PYUimMJHCzVGdtR4@api.cloudinary.com/v1_1/< dbdhrolar >/resources/image'
  private cloudinaryApiKey = cloudinaryConfig.apiKey;
  private cloudinaryApiSecret = cloudinaryConfig.apiSecret;


  constructor(private http: HttpClient) {}



   getImagesInFolder(folderName: string): Observable<any> {
    const url = `${this.cloudinaryApiUrl}?prefix=${folderName}`;
    console.log('Constructed URL:', url); // Log the URL
    
    // Create headers with authorization
    const authHeader = btoa(`${this.cloudinaryApiKey}:${this.cloudinaryApiSecret}`);
    console.log('Auth Header:', authHeader); // Log auth header
    console.log('API URL:', url); // Log the constructed URL
    const headers = new HttpHeaders({
      Authorization: `Basic ${authHeader}`
    });

    return this.http.get(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching images:', error);
        return throwError('An error occurred while fetching images.');
      })
    );
  }

  
  
  
}
