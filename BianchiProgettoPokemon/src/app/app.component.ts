import { Component } from '@angular/core';
import { PokedexService } from './common/pokedex.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  title = 'BianchiProgettoPokemon';

  constructor(public pokedex: PokedexService)
  {
  }
}
