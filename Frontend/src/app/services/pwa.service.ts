import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { timer, take } from 'rxjs';
import { PromptComponentComponent } from '../components/prompt-component/prompt-component.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform
  ) {}

  //This will pop up a screen based on which device it its, it listens onInit to findout if it is and ios or android device
  public initPwaPrompt() {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode =
        'standalone' in window.navigator && window.navigator['standalone'];
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }
  // Commented out this code for now to allow development to go through without showing the popup , will use this later
  private openPromptComponent(mobileType: 'ios' | 'android') {
    this.bottomSheet.open(PromptComponentComponent, {
             data: { mobileType, promptEvent: this.promptEvent }
    })
 
  }
}
