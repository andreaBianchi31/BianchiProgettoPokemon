import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { Observable } from 'rxjs';
import { PokemonSpecies } from './pokemon-species';

@Injectable({
  providedIn: 'root'
})
export class PokedexService
{
  missingNumberNormal: string = '../assets/images/missing-number/missing-number-normal.jpg';
  missingNumberShiny: string = '../assets/images/missing-number/missing-number-shiny.jpg';
  missingNumberSprite: string = '../assets/images/missing-number/missing-number-sprite.png';
  //missingNoPokemon: Pokemon;
  //missingNoSpecies: PokemonSpecies; (-151)
  //missingNoPokemon: Pokemon; (-151)
  typeNormal: string = '../assets/images/types/type-';
  typeUnknown: string = '../assets/images/types/unknown-';
  imageNotAvailable: string = '../assets/images/utility/pokeball-icon.png';

  searchBaseURL: string = 'https://pokeapi.co/api/v2/';
  searchPokemon: string = this.searchBaseURL + 'pokemon/';
  searchPokemonSpecies: string = this.searchBaseURL + 'pokemon-species/';
  searchType: string = this.searchBaseURL + 'type/';
  searchEvolutionChain: string = this.searchBaseURL + 'evolution-chain/';
  searchForms: string = this.searchBaseURL + 'pokemon-form/';
  searchGeneration: string = this.searchBaseURL + 'generation/';
  searchGame: string = this.searchBaseURL + 'version-group/';
  searchPokedex: string = this.searchBaseURL + 'pokedex/';
  serachRegion: string = this.searchBaseURL + 'region/';

  lastPokemonNumber: number = 905;
  searchLimit: string = '?limit=' + this.lastPokemonNumber + '&offset=0';

  pokemonList: Pokemon[] = [];
  favouriteList: PokemonSpecies[] = [];

  language: string = 'en';

  currentPokemon: Pokemon | null = null;


  /*
  =====> MESSAGGIO IMPORTANTE <====
  Questo sito web sfutta PokéAPI per ricavare dati precisi e abbondanti, sempre aggiornati.
  Nonostante ciò, i dati dei pokemon di 9° Generazione (in particolare le loro immagini)
  non sono del tutto aggiornati. Portate pazienza e scusate per il disagio!

  ====> IMPORTANT MESSAGE <=====
  This website relies on PokéAPI [link] to get accurate and abundant data that is always up to date.
  Despite this, the data of the 9th Generation pokemon, expecially their images, are not  up to date.
  It doesn't depend on me. PokéAPI dev-team is keen on keeping the data updated.
  Please be patient and sorry for the inconvenience!
  */


  constructor(private httpAssistant: HttpClient)
  {
  }


  /*getMissingNo(): Pokemon
  {
    //return this.missingNoPokemon;
  }*/


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


  getCurrentPokemon(): Pokemon | null
  {
    return this.currentPokemon;
  }


  setCurrentPokemon(pokemon: Pokemon)
  {
    this.currentPokemon = pokemon;
  }


// ======================================================================================================================================================


  //===> USELESS <===
  getFavouritePokemonListSorted(): PokemonSpecies[]
  {
    this.favouriteList = this.sortPokemonList(this.favouriteList);
    return this.favouriteList;
  }


  addFavouritePokemonSpecies(pokemon: PokemonSpecies)
  {
    if (this.indexOfPokemonSpecies(this.favouriteList, pokemon) == -1)
    {
      this.favouriteList.push(pokemon);
      this.favouriteList = this.sortPokemonList(this.favouriteList);
      console.log(this.favouriteList);
    }
    else
    {
      console.log(pokemon.name + ' is already one of your favourite pokemon!')
    }
  }


  removeFavouritePokemonSpecies(pokemon: PokemonSpecies)
  {
    for (let index = 0; index < this.favouriteList.length; index++) {
      if (this.favouriteList[index].equals(pokemon))
        this.favouriteList.splice(index, 1);
    }
    this.favouriteList = this.sortPokemonList(this.favouriteList);
    console.log(this.favouriteList);
  }


  indexOfPokemon(pokemonList: Pokemon[], pokemon: Pokemon)
  {
    for (let index = 0; index < pokemonList.length; index++)
    {
      if (pokemonList[index].equals(pokemon))
        return index;
    }
    return -1;
  }


  indexOfPokemonSpecies(pokemonList: PokemonSpecies[], pokemon: PokemonSpecies)
  {
    for (let index = 0; index < pokemonList.length; index++)
    {
      if (pokemonList[index].equals(pokemon))
        return index;
    }

    return -1;
  }


// ======================================================================================================================================================


  getPokemonByID(id: string): Observable<any>
  {
    return this.httpAssistant.get(this.searchPokemon + id);
  }


  getPokemonByURL(url: string): Observable<any>
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


  getPokemonFormByUrl(url: string)
  {
    return this.httpAssistant.get(url);
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



  getPokemonByRegion(region: string): Observable<any>
  {
    return this.httpAssistant.get(this.serachRegion + region);
  }


  sortPokemonList(pokemonList: PokemonSpecies[]): PokemonSpecies[]
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


  sortPokemonSpeciesList(pokemonList: PokemonSpecies[]): PokemonSpecies[]
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


  getPokemonSpecies(name: string): Observable<any>
  {
    return this.httpAssistant.get(this.searchPokemonSpecies + name);
  }


  getAllPokemonSpecies(): Observable<any>
  {
    return this.httpAssistant.get(this.searchPokemonSpecies + '?limit=' + this.lastPokemonNumber);
  }
  
  
  getPokemonSpeciesByUrl(url: string): Observable<any>
  {
    return this.httpAssistant.get(url);
  }


  getEntryByLanguage(flavorTextEntries: any[], language: string): string[]
  {
    let finalEntries: string[] = [];
    
    let entryText = '';
    flavorTextEntries.forEach(entry => {
        if (entry.language != undefined && entry.language != null && entry.language.name == language)
        {
            entryText = entry.flavor_text;
            entryText = entryText.replace(/\n/g,' ');
            entryText = entryText.replace(/\f/g,' ');
            entryText = entryText.replace('POKéMON', 'Pokémon');
            entryText = entryText.trim();
            finalEntries.push(entryText);
        }
    });

    return finalEntries;
  }

}
