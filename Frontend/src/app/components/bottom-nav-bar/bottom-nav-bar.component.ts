import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-nav-bar',
  templateUrl: './bottom-nav-bar.component.html',
  styleUrls: ['./bottom-nav-bar.component.scss']
})
export class BottomNavBarComponent implements OnInit{
  
  islog = false // Variable to track if a user is logged in (assumed boolean)
  active ="#homeNav" // Default active tab ID set to the Home tab
  home : string | undefined // A property to store the value of the "home" string (possibly representing a URL or route)
  @Input() activeP?: string; // Input property to receive the active tab ID from a parent component

  constructor(){

  }
  ngOnInit(): void {


  }

}
