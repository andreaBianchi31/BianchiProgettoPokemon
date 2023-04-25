import { Component, Input } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';
import { Pokemon } from '../common/pokemon';
import { PokemonSpecies } from '../common/pokemon-species';

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css']
})
export class BigCardComponent
{
  @Input() currentPokemon: Pokemon | null = null;

  constructor(private pokedex: PokedexService)
  {
    pokedex.getPokemonSpeciesByUrl('https://pokeapi.co/api/v2/pokemon-species/pikachu').subscribe(
        (data) => {
          /*
            let pokemonSpecies = new PokemonSpecies(data.id, data.names, data.pokedex_numbers, data.is_baby, data.is_legendary, data.is_mythical, data.flavor_text_entries, data.form_descriptions, data.genera, data.generation.name, data.varieties, this.pokedex);
          */
          },
        (error) => {
          console.log('Failed search!');
        }
      );
  }
}
