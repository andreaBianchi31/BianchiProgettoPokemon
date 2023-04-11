import { Component } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';
import { Pokemon } from '../common/pokemon';
import { Title } from '@angular/platform-browser';
import { PokemonSpecies } from '../common/pokemon-species';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent
{
  pokemonList: PokemonSpecies[] = [];

  generation: number;
  generationList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  datiDisponibili: boolean;


  constructor(private pokedex: PokedexService, private title: Title)
  {
    this.title.setTitle('Pokedex - Home');
    this.generation = 1;
    this.getPokemonByGeneration();
    this.datiDisponibili = false;
  }


  getPokemonByGeneration()
  {
    console.log('Searching pokemon of Generation ' + this.generation + '...');
    this.title.setTitle('Pokedex -  Generation ' + this.generation);

    this.datiDisponibili = false;

    let dati = this.pokedex.getPokemonByGeneration('' + this.generation).subscribe (
      (data) => {
          this.pokemonList = [];
          let pokemonSpeciesList = data.pokemon_species;

          pokemonSpeciesList.forEach((pokemon: any) => {
            this.pokedex.getPokemonSpeciesByUrl(pokemon.url).subscribe(
              (data: any) => {
                let pokemon = new PokemonSpecies(data.id, data.names, data.order, data.is_baby, data.is_legendary, data.is_mythical, data.flavor_text_entries, data.form_descriptions, data.generation, data.generation.name, this.pokedex);
                this.pokemonList.push(pokemon);

                if (pokemonSpeciesList.length == this.pokemonList.length)
                {
                  this.datiDisponibili = true;
                  this.pokemonList = this.pokedex.sortPokemonSpeciesList(this.pokemonList);
                  console.log(this.pokemonList.length + ' pokemon species found!');
                  console.log(this.pokemonList);
                }
              }
            )
          });
      },
      (error) => {
        console.log('Failed search!');
      }
    );
  }

}