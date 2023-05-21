import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
{
  selection: string = 'home';

  styleBase: string = 'border-2 border-black rounded font-bold ';
  styleNormal: string = this.styleBase + 'bg-gray-300 hover:bg-gray-100 text-black';
  styleSelected: string = this.styleBase + 'bg-red-600 hover:bg-red-500 text-gray-100';

  styleHome: string = this.styleNormal;
  styleAboutUs: string = this.styleNormal;
  stylePokemonInfo: string = this.styleNormal;

  pathBase: string = '/pokedex';
  pathHome: string = this.pathBase + '/home';
  pathAboutUs: string = this.pathBase + '/about-us';
  pathPokemonInfo: string = this.pathBase + '/what-is-a-pokemon';


  constructor(private router: Router)
  {
    this.router.navigate(['/pokedex/home']);
    this.changeSelection('home');
  }


  changeSelection(selection: string)
  {
    switch(selection)
    {
      case 'home':
        this.styleHome = this.styleSelected;
        this.styleAboutUs = this.styleNormal;
        this.stylePokemonInfo = this.styleNormal;
        break;

      case 'about-us':
        this.styleHome = this.styleNormal;
        this.styleAboutUs = this.styleSelected;
        this.stylePokemonInfo = this.styleNormal;
        break;

      case 'pokemon-info':
        this.styleHome = this.styleNormal;
        this.styleAboutUs = this.styleNormal;
        this.stylePokemonInfo = this.styleSelected;
        break;
    }
  }
}
