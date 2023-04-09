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

    let dati = this.pokedex.getPokemonByGeneration('' + this.generation).subscribe(
      data => {
        if (data != undefined)
        {
          this.pokemonList = [];
          let pokemonSpeciesList = data.pokemon_species;

          pokemonSpeciesList.forEach((pokemon: any) => {
            this.pokedex.getPokemonSpeciesByURL(pokemon.url).subscribe(
              (data: any) => {
                let pokemon = new Pokemon(data.id, data.name, '', '');
                this.pokemonList.push(pokemon);

                if (pokemonSpeciesList.length == this.pokemonList.length)
                {
                  this.datiDisponibili = true;
                  this.pokemonList = this.pokedex.sortPokemonList(this.pokemonList);
                  console.log(this.pokemonList.length + ' pokemon species found!');
                }
              }
            )
          });
        }
        else
        {
          console.log('Failed search!');
        }
      }
    );
  }


  getPokemonByRegion()
  {
    console.log('Searching pokemon from ' + this.generation + ' region...');
    this.title.setTitle('Pokedex - ' + this.generation + ' region');

    this.datiDisponibili = false;

    let dati = this.pokedex.getPokemonByRegion('' + this.generation).subscribe(
      data => {
        if (data != undefined)
        {
          this.pokemonList = [];
          let pokemonSpeciesList = data.pokemon_species;

          pokemonSpeciesList.forEach((pokemon: any) => {
            this.pokedex.getPokemonSpeciesByURL(pokemon.url).subscribe(
              data => {
                let pokemon = new Pokemon(data.id, data.name, '', '');
                this.pokemonList.push(pokemon);

                if (pokemonSpeciesList.length == this.pokemonList.length)
                {
                  this.datiDisponibili = true;
                  this.pokemonList = this.pokedex.sortPokemonList(this.pokemonList);
                  console.log(this.pokemonList.length + ' pokemon species found!');
                }
              }
            );
          });
        }
        else
        {
          console.log('Failed search!');
        }
      }
    );
  }

}
