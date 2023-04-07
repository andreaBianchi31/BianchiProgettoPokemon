import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexService
{
  missingNo: Pokemon = new Pokemon(-151, 'MissingNo', '', '');

  searchBaseURL: string = 'https://pokeapi.co/api/v2/';
  searchPokemon: string = this.searchBaseURL + 'pokemon/';
  searchPokemonSpecies: string = this.searchBaseURL + 'pokemon-species/';
  searchType: string = this.searchBaseURL + 'type/';
  searchEvolutionChain: string = this.searchBaseURL + 'evolution-chain/';
  searchForms: string = this.searchBaseURL + 'pokemon-form/';
  searchGeneration: string = this.searchBaseURL + 'generation/';
  searchGame: string = this.searchBaseURL + 'version-group/';
  searchPokedex: string = this.searchBaseURL + 'pokedex/';

  pokemonList: Pokemon[] = [];
  currentPokemon: Pokemon = this.missingNo;
  favouritesList: Pokemon[] = [];

  language: string = 'eng';


  /*
  =====> MESSAGGIO IMPORTANTE <====
  Questo sito web sfutta PokéAPI per ricavare dati precisi e abbondanti, sempre aggiornati.
  Nonostante ciò, i dati dei pokemon di 9° Generazione (in particolare le loro immagini)
  non sono del tutto aggiornati. Portate pazienza e scusate per il disagio!

  ====> IMPORTANT MESSAGE <=====
  This website relies on PokéAPI [link] to get accurate and abundant data that is always up to date.
  Despite this, the data of the 9th Generation pokemon (expecially their images) are not
  quite up to date. It doesn't depend on me. PokéAPI dev-team is keen on keeping the data
  updated. Please be patient and sorry for the inconvenience!
  */


  constructor(private httpAssistant: HttpClient)
  {
  }


  getMissingNo(): Pokemon
  {
    return this.missingNo;
  }


  getLanguage(): string
  {
    return this.language;
  }


  setLanguage(language: string)
  {
    this.language = language;
  }


  getPokemonList(): Pokemon[]
  {
    return this.pokemonList;
  }


  setPokemonList(pokemonList: Pokemon[])
  {
    this.pokemonList = pokemonList;
  }


  getCurrentPokemon(): Pokemon
  {
    return this.currentPokemon;
  }


  setCurrentPokemon(pokemon: Pokemon)
  {
    this.currentPokemon = pokemon;
  }


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


  sortPokemonList(pokemonList: Pokemon[]): Pokemon[]
  {
    // BubbleSort
    for(let i = 0; i <= pokemonList.length-1; i++)
    {
        for(let j = 0; j < (pokemonList.length-i-1); j++)
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
