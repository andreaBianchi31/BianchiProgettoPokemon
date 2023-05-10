import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  selectedPath: string = '';

  pathBase: string = '/pokedex';
  pathHome: string = this.pathBase + '/home';
  pathAboutUs: string = this.pathBase + '/about-us';
  pathPokemonInfo: string = this.pathBase + '/what-is-a-pokemon';

  constructor(private router: Router)
  {
    this.router.navigate(['/pokedex/home']);
  }

  changeSelection()
  {
    console.log('soooos');
  }
}
