import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexService
{
  baseURL: string = 'https://pokeapi.co/api/v2/';
  searchPokemon: string = this.baseURL + 'pokemon/';
  searchPokemonSpecies: string = this.baseURL + 'pokemon-species/';
  searchType: string = this.baseURL + 'type/';
  searchEvolutionChain: string = this.baseURL + 'evolution-chain/';
  searchForms: string = this.baseURL + 'pokemon-form/';
  searchGeneration: string = this.baseURL + 'generation/';
  searchGame: string = this.baseURL + 'version-group/';
  searchPokedex: string = this.baseURL + 'pokedex/';

  pokemonList: Pokemon[] = [];
  //currentPokemon: Pokemon = this.getPokemonByID('pikachu');
  favouritesList: Pokemon[] = [];


  constructor(private httpAssistant: HttpClient)
  {
  }


  getPokemonList(): Pokemon[]
  {
    return this.pokemonList;
  }


  setPokemonList(pokemonList: Pokemon[])
  {
    this.pokemonList = pokemonList;
  }


  /*getCurrentPokemon(): Pokemon
  {
    //return this.currentPokemon;
  }


  setCurrentPokemon(currentPokemon: Pokemon)
  {
    this.currentPokemon = currentPokemon;
  }*/

  getFavouritePokemonList(): Pokemon[]
  {
    return this.favouritesList;
  }

  addFavouritePokemon(pokemon: Pokemon)
  {
    this.favouritesList.push(pokemon);
  }

  removeFavouritePokemon(pokemon: Pokemon)
  {
    for (let index = 0; index < this.favouritesList.length; index++)
    {
      if (this.favouritesList[index] == pokemon)
        this.favouritesList.splice(index, 1);
    }
  }

  getPokemonByID(id: string): Observable<any>
  {
    return this.httpAssistant.get(this.searchPokemon + id);
  }


  getPokemonByURL(url: string): Observable<any>
  {
    return this.httpAssistant.get(url);
  }


  getPokemonSpeciesByID(id: string): Observable<any>
  {
    return this.httpAssistant.get(this.searchPokemonSpecies + id);
  }

  getPokemonSpeciesByURL2(url: string): Observable<any>
  {
    return this.httpAssistant.get(url);
  }

  /*getPokemonSpeciesByURL(url: string): Pokemon
  {
    let pokemon: Pokemon;

    this.httpAssistant.get(url).subscribe (
      (data: any) => {
        console.log(data);
        pokemon = new Pokemon(data.name, '', '');
        return pokemon;
      }
    );
  }*/


  getPokemonByType(type: string): Observable<any>
  {
    return this.httpAssistant.get(this.searchType + type);
  }


  getPokemonByEvolutionChain(evolutionChain: string): Observable<any>
  {
    return this.httpAssistant.get(this.searchEvolutionChain + evolutionChain);
  }


  getPokemonForms(name: string)
  {

  }


  getPokemonByGeneration(generation: string): Observable<any>
  {
    return this.httpAssistant.get(this.searchGeneration + generation);
  }


  getPokemonByPokedex(pokedex: string): Observable<any>
  {
    return this.httpAssistant.get(this.searchPokedex + pokedex);
  }


  getPokemonByGame(gameVersion: string): Observable<any>
  {
    return this.httpAssistant.get(this.searchGame + gameVersion);
  }


  bubbleSortPokemonList(pokemonList: Pokemon[]): Pokemon[]
  {
    for(let i = 0; i <= pokemonList.length-1; i++)
    {
        for(let j = 0; j < ( pokemonList.length - i -1); j++)
        {
            if(pokemonList[j].id > pokemonList[j+1].id)
            {
              let temp = pokemonList[j]
              pokemonList[j] = pokemonList[j + 1]
              pokemonList[j+1] = temp
            }
        }
    }

    return pokemonList;
}

}
