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

  constructor(private pokedex: PokedexService, private title: Title)
  {
    this.generation = 1;
    this.getPokemonByGeneration();
    this.title.setTitle('Pokedex del sium!')
    console.log(this.title.getTitle());
    console.log('SOOOOS');
    console.log(this.pokemonList);
  }

  getPokemonByGeneration()
  {
    let dati = this.pokedex.getPokemonByGeneration('7').subscribe(
      data => {

        let pokemonSpeciesList = data.pokemon_species;

        data.pokemon_species.forEach((pokemon: any) => {
          this.pokedex.getPokemonSpeciesByURL2(pokemon.url).subscribe(
            data => {
              let pokemon = new Pokemon(data.id, data.name, '', '');
              //console.log(data.name);
              this.pokemonList.push(pokemon);
              this.pokemonList = this.pokedex.bubbleSortPokemonList(this.pokemonList);
            }
          );
        
        

          //this.pokemonList.push(this.pokedex.getPokemonSpeciesByURL(pokemon.url));
        });

        /*let pokemonSpeciesList = data.pokemon_species;
        data.pokemon_species.forEach((pokemon: any) => {
          this.pokemonList.push(this.pokedex.getPokemonSpeciesByURL(pokemon.url));
        });*/
      }
    );
  }

}
