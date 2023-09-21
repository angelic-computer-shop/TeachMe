import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ImagesService } from 'src/app/services/images.service';
import { DataformatService } from 'src/app/services/dataformat.service';

declare var $: any; // Importing jQuery library
declare var webkitSpeechRecognition: any; // Importing jQuery library

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  // Component properties
  queryText = ''; // Search query text
  responseQuestion = ''; // Question associated with the response
  responseBody = ''; // Response message body
  humourSwitch = false; // Switch for sense of humor
  user_id = 0; // User ID
  images: any[] = [];
  isLoading: boolean = false; // Loading indicator
  //Web speech properties
  recognition: any; // Speech recognition instance
  isRecognizing = false; // Speech recognition status
  content?: any; // Content holder
  browserSupport: boolean = false; // Browser support for speech recognition
  isSearchingLoader: boolean = false;
  constructor(
    private core: CoreService,
    private session: SessionsService,
    private location: Location,
    private renderer: Renderer2,
    private imageService: ImagesService,
    private formatter: DataformatService
  ) {
    //Check if webkitSpeechRecognition is supported
    if ('webkitSpeechRecognition' in window) {
      this.browserSupport = true; // Browser supports speech recognition
      // Initialize speech recognition
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;

      // Event handlers for speech recognition
      this.recognition.onstart = () => {
        this.isRecognizing = true; // Speech recognition started
      };

      this.recognition.onspeechend = () => {
        this.isRecognizing = false; // Speech recognition ended
      };

      this.recognition.onerror = () => {};

      this.recognition.onresult = async (event: any) => {
        var current = event.resultIndex;
        var transcript = await event.results[current][0].transcript;
        console.log(transcript);
        this.queryText = transcript; // Set query text to recognized speech
      };
    } else {
      this.browserSupport = false; // Browser does not support speech recognition
    }
  }
  // Component lifecycle hook
  ngOnInit(): void {
    this.user_id = this.session.getLoggedUser().userId; // Get user ID from session
    this.queryText; // Initialize query text
    this.fetchImagesInFolder('terms');
  }
  // Method to save search query and response to favorites
  saveSearch() {
    const search = {
      query_searched: this.responseQuestion,
      response_searched: this.responseBody,
      ishumour: this.humourSwitch,
    };

    // Save to favorites through core service
    this.core.saveToFavorites(this.user_id, search).subscribe((response) => {
      // Display success message with Swal (SweetAlert2)
      Swal.fire({
        icon: 'success',
        title: 'Successfully saved',
        showConfirmButton: false,
        timer: 1300,
      }).then((result) => {
        setTimeout(() => {
          window.location.reload(); // Reload the page
        }, 500);
      });
    });
  }

  // Method for internal operations handling response and query
  internalOperations(response: any) {
    // Save query response and question in session
    this.session.saveQueryResponse(response);
    this.session.saveQueryQuestion(this.queryText);

    // Get response body and question from session
    this.responseBody = this.session.getQueryResponse().message;
    this.responseQuestion = this.session.getQueryQuestion();

    // Display Swal (SweetAlert2) modal
    Swal.fire({
      icon: 'info',
      titleText: this.formatter.capitalizeFirstLetter(this.queryText),
      text: this.responseBody,
      confirmButtonColor: '#38A3A5',
      showCloseButton: true,
      showCancelButton: true,
      // Customized confirm and cancel buttons

      confirmButtonText: '<i class="bi bi-star-fill"></i> Add to favourites!',
      confirmButtonAriaLabel: 'Thumbs up',
      cancelButtonText: '<i class="bi bi-hand-thumbs-up-fill"></i> Understood!',
      cancelButtonAriaLabel: 'Understood!',
      // Footer with link
      footer: '<a href="lesson-plan-calender">Learn more?</a>',
    }).then((result) => {
      // Handle user interaction with Swal modal
      if (result.isConfirmed) {
        this.saveSearch(); // Save the search query and response to favorites
      } else if (result.isDismissed) {
        console.log('Modal dismissed');
      } else {
        console.log('Modal dismissed');
      }
    });
  }

  // Method to perform search query
  searchQuery() {
    this.isSearchingLoader = true;
    const searchedB4 = this.session.getLoggedUser().searchedbefore;
    // Update user's searched before status
    if (searchedB4 == false) {
      const firstSearch = {
        searchedbefore: true,
        email: this.session.getLoggedUser().email,
      };

      // Update user's first time search status
      this.core.updateSearchedBefore(firstSearch).subscribe((response) => {
        this.session.updateUserFirstTimeSearch();
        //  window.location.reload()
      });
    }
    // Perform search based on humor switch statu
    if (this.humourSwitch) {
      this.humourSwitch = true;
      this.core
        .SearchTermWithHumor({ message: this.queryText })
        .subscribe((response) => {
          this.isSearchingLoader = false;
          this.internalOperations(response);
        });
    } else {
      this.humourSwitch = false;

      this.core
        .SearchTerm({ message: this.queryText })
        .subscribe((response) => {
          this.isSearchingLoader = false;
          this.internalOperations(response);
        });
    }
  }
  // Method to start speech recognition
  startRecognition() {
    // Check if recognition is not already active
    this.queryText = '';
    if (!this.isRecognizing) {
      this.isRecognizing = true; // Set recognition status to active
      this.recognition.start(); // Start speech recognition
    }
  }

  // Method to stop speech recognition
  stopRecognition() {
    this.recognition.stop(); // Stop speech recognition
    this.isRecognizing = false; // Set recognition status to inactive
    this.queryText = this.queryText; // Update query text (possibly redundant)
    setTimeout(this.stopRecognition, 1000); // Schedule stopRecognition after 1 second
  }

  // Method to handle input in the text box
  onTextboxInput(event: Event) {
    // Set queryText to the value of the input element
    this.queryText = (event.target as HTMLTextAreaElement).value;
  }

  fetchImagesInFolder(folderName: string): void {
    this.imageService.getImagesInFolder(folderName).subscribe(
      (data: any) => {
        this.images = data.resources;
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }
}
