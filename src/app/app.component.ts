import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Sample Application';
 

  constructor( private themeService: ThemeService) {};

ngOnInit(): void {
 
};

toggleTheme() {
  if (this.themeService.isDarkTheme()) {
    this.themeService.setLightTheme();
  } else {
    this.themeService.setDarkTheme();
  }
}

}
