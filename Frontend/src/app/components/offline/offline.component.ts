import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {

  @Input() showMessage: boolean = false;
  @Input() message: string = '';
  @Input() isOffline: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
