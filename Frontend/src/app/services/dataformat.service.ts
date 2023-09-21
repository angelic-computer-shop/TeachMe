import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataformatService {

constructor() { }

capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

}
