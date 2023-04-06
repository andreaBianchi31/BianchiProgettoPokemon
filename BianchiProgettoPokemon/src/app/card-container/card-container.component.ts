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
    this.getPokemonByGeneration();
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
              let pokemon = new Pokemon(data.name, '', '');
              console.log(data.name);
              this.pokemonList.push(pokemon);
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
