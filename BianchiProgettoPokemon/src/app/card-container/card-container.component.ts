import { Component } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';
import { Pokemon } from '../common/pokemon';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent
{
  pokemonList: Pokemon[] = [];
  generation: number;

  constructor(private pokedex: PokedexService)
  {
    this.generation = 1;
  }

  getPokemonByGeneration()
  {
    this.pokedex.getPokemonByGeneration('7');
  }

}
