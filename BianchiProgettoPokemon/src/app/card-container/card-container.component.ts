import { Component } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';
import { Pokemon } from '../common/pokemon';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent
{
  pokemonList: Pokemon[] = [];

  generation: number;
  generationList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private pokedex: PokedexService, private title: Title)
  {
    this.title.setTitle('Pokedex - Default');
    this.generation = 1;
    this.getPokemonByGeneration();
    console.log(this.title.getTitle());
    console.log('SOOOOS');
    console.log(this.pokemonList);
  }

  getPokemonByGeneration()
  {
    let dati = this.pokedex.getPokemonByGeneration('' + this.generation).subscribe(
      data => {
        if (data != undefined)
        {
          this.pokemonList = [];
          let pokemonSpeciesList = data.pokemon_species;
          data.pokemon_species.forEach((pokemon: any) => {
            this.pokedex.getPokemonSpeciesByURL2(pokemon.url).subscribe(
              data => {
                let pokemon = new Pokemon(data.id, data.name, '', '');
                this.pokemonList.push(pokemon);
                this.pokemonList = this.pokedex.sortPokemonList(this.pokemonList);
              }
            );
          });
        }
      }
    );

    console.log('Searching pokemon of Generation n. ' + this.generation);
    this.title.setTitle('Pokedex -  Generation n.' + this.generation);
  }

}
