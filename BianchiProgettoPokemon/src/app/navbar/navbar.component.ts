import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
{
  styleSelected: string = '';
  styleNormal: string = '';

  styleHome: string = '';
  styleAboutUs: string = '';
  styleWhatIsAPokemon: string = '';

  changeSelection()
  {
    console.log('soooos');
  }
}
