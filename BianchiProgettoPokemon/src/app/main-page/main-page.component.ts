import { Component, } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent
{
  navbarSelection: string = 'home';

  constructor(public pokedex: PokedexService)
  {
  }

  changeSelection(selection: string)
  {
    this.navbarSelection = selection;
  }

}
