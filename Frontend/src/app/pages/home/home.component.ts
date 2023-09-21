import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { Users } from 'src/app/types/users';
import { SearchObject } from 'src/app/types/searchObject';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  loggedUser: Users | undefined;
  name: string | undefined;
  surname: string | undefined;
  img: string | undefined;
  searchedBefore = false;
  showSearched = false;
  cardLabel = '';
  responseBody = '';
  responseQuestion: any;
  isIconFilled = false;
  favoutitesArray: SearchObject[] = [];
  user_id = 0;
  undoDelete = false;
  continueDelete = false;
  favouritesData: any;

  @Input() activeP?: string;
  constructor(private session: SessionsService, private core: CoreService) { }

  searchText: string = '';

  ngOnInit(): void {
    this.name = this.session.getLoggedUser().name;
    this.surname = this.session.getLoggedUser().surname;
    this.img = this.session.getLoggedUser().profile_picture;
    this.searchedBefore = this.session.getLoggedUser().searchedbefore;
    this.user_id = this.session.getLoggedUser().userId;

    /**
     * TODO: when user search and its a first time, it must change the searched before to true, so they no longer see the fun facts
     */

    if (this.searchedBefore == true) {
      this.isLoading = true;
      this.cardLabel = 'Favourite searched terms';
      this.initiateUserHistory();
      this.responseBody = this.session.getQueryResponse().message;
      if (this.responseBody.length != 0) {
        this.showSearched = true;
        this.responseQuestion = this.session.getQueryQuestion();
      }
    } else {
      this.cardLabel = 'Fun facts about ABSA';
    }
  }

  contDelete() {
    this.continueDelete = true;

  }

  unfavoriteSearch(searchId: number) {
    this.undoDelete = true;


    setTimeout(() => {
      // Your code to execute after the delay
      if (this.continueDelete == false) {
        this.core.unfavoriteSearch(searchId).subscribe((response) => {
          this.favoutitesArray = this.favoutitesArray.filter((search) => search.id !== searchId);
          this.undoDelete = false;
          this.continueDelete = false;
        });
      } else {
        this.undoDelete = false;
      }

      this.continueDelete = false;


    }, 2000);

  }

  initiateUserHistory() {
    this.core.getLatestFavouriteSearch(this.user_id).subscribe((response) => {
      this.favoutitesArray = response;
      this.isLoading = false;
      console.log(this.favoutitesArray[0], 'fav array');
    });
  }
}
