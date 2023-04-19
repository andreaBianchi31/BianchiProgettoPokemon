import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PokedexService } from '../common/pokedex.service';
import { PokemonSpecies } from '../common/pokemon-species';

@Component({
  selector: 'app-maxi-container',
  templateUrl: './maxi-container.component.html',
  styleUrls: ['./maxi-container.component.css']
})
export class MaxiContainerComponent
{
  pokemonList: PokemonSpecies[] = [];

  generation: number = 1;
  generationList: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  game: string = 'blue-red';
  gamesList: string[] = [];

  parameter: string = 'Generation';
  searchParametersList: string[] = ['Generation', 'Game', 'Favourite'];

  datiDisponibili: boolean;
  cambioForma: boolean;


  constructor(private pokedex: PokedexService, private title: Title)
  {
    this.title.setTitle('Pokedex - Home');
    this.generation = 1;
    this.getPokemonByGeneration();
    this.datiDisponibili = false;
    this.cambioForma = false;
  }


  getPokemonByGeneration()
  {
    if (this.generation == 0)
    {
      console.log('Searching pokemon of All Generations...');
      this.title.setTitle('Pokedex - All Generations');

      this.pokemonList = [];
      this.datiDisponibili = false;
    }
    else
    {
      console.log('Searching pokemon of Generation ' + this.generation + '...');
      this.title.setTitle('Pokedex - Generation ' + this.generation);

      this.pokemonList = [];
      this.datiDisponibili = false;

      let dati = this.pokedex.getPokemonByGeneration('' + this.generation).subscribe (
        (data) => {
            this.pokemonList = [];
            let pokemonSpeciesList = data.pokemon_species;

            pokemonSpeciesList.forEach((pokemon: any) => {
              this.pokedex.getPokemonSpeciesByUrl(pokemon.url).subscribe(
                (data: any) => {
                  let pokemon = new PokemonSpecies(data.id, data.names, data.pokedex_numbers, data.is_baby, data.is_legendary, data.is_mythical, data.flavor_text_entries, data.form_descriptions, data.genera, data.generation.name, data.varieties, this.pokedex);
                  this.pokemonList.push(pokemon);

                  if (pokemonSpeciesList.length == this.pokemonList.length)
                  {
                    this.datiDisponibili = true;
                    this.pokemonList = this.pokedex.sortPokemonSpeciesList(this.pokemonList);
                    console.log(this.pokemonList.length + ' pokemon species found!');
                    console.log(this.pokemonList);
                    this.getAllVarieties();
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


  // Setta tutte le forme alternative di ogni pokemon
  getAllVarieties()
  {
    this.pokemonList.forEach((pokemonSpecie: PokemonSpecies) => {
      pokemonSpecie.setPokemonVarieties(this.pokedex);
    });
  }
}
