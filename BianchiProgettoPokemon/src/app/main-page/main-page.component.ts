import { Component, } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent
{
  
  constructor(public pokedex: PokedexService)
  {
  }

}
