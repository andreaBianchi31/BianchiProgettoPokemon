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
  basePath: string = '../assets/images';
  imageNotAvailable: string = this.basePath + '/utility/pokeball-icon.png';
  typeNormal: string = this.basePath + '/types/type-';
  typeUnknown: string = this.basePath + '/types/unknown-';

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

  private lastPokemonNumber: number = 905;
  private searchLimit: string = '?limit=' + this.lastPokemonNumber + '&offset=0';
  
  private favouritePokemonSpeciesList: number[] = [];
  private favouriteLocalStorageKey: string = 'favourites';

  private language: string = 'en';

  private validato: boolean = false;



  constructor(private httpAssistant: HttpClient)
  {
  }


  // ===========================================================================================================================================================
  // ========================================================> GENERIC - SETTERS & GETTERS <====================================================================
  // ===========================================================================================================================================================


  getLanguage(): string
  {
    return this.language;
  }


  setLanguage(language: string)
  {
    this.language = language;
  }


  getValidato(): boolean
  {
    return this.validato;
  }


  setValidato(validato: boolean)
  {
    this.validato = validato;
  }


  getLastPokemon(): number
  {
    return this.lastPokemonNumber;
  }


  getFavouriteLocalStorageKey(): string
  {
    return this.favouriteLocalStorageKey;
  }


  getSearchLimitString(): string
  {
    return this.searchLimit;
  }


  // ===========================================================================================================================================================
  // =========================================================================> FAVOURITES <====================================================================
  // ===========================================================================================================================================================
  

  getFavouritePokemonList(): number[]
  {
    this.sortFavouritePokemonList();

    this.reloadFavouriteList();

    return this.favouritePokemonSpeciesList;
  }


  sortFavouritePokemonList()
  {    
    //this.removeAllNaN();

    for(let i = 0; i <= this.favouritePokemonSpeciesList.length-1; i++)
    {
        for(let j = 0; j < (this.favouritePokemonSpeciesList.length-i-1); j++)
        {
          if(this.favouritePokemonSpeciesList[j] > this.favouritePokemonSpeciesList[j+1])
          {
            let temp = this.favouritePokemonSpeciesList[j]
            this.favouritePokemonSpeciesList[j] = this.favouritePokemonSpeciesList[j + 1]
            this.favouritePokemonSpeciesList[j+1] = temp
          }
        }
    }

    return this.favouritePokemonSpeciesList;
  }

  
  addFavouritePokemonSpecies(pokedexNumber: number)
  {
    if (this.favouritePokemonSpeciesList.indexOf(pokedexNumber) == -1)
    {
      this.favouritePokemonSpeciesList.push(pokedexNumber);
      this.sortFavouritePokemonList();
      this.saveFavouritesLocalStorage();
    }
    else
    {
      console.error('ERROR => Pokémon #' + pokedexNumber + 'is already a favourite Pokémon!');
    }

    console.log(this.favouritePokemonSpeciesList);
  }


  removeFavouritePokemonSpecies(pokedexNumber: number)
  {
    if (this.favouritePokemonSpeciesList.indexOf(pokedexNumber) == -1)
    {
      console.error('ERROR => Pokémon #' + pokedexNumber + 'is NOT a favourite Pokémon!');
    }
    else
    {
      let trovato = false;

      for (let index = 0; index < this.favouritePokemonSpeciesList.length && !trovato; index++)
      {
        if (this.favouritePokemonSpeciesList[index] == pokedexNumber)
        {
          console.log(this.favouritePokemonSpeciesList[index]);
          this.favouritePokemonSpeciesList.splice(index, 1);
          trovato = true;
        }
      }

      this.saveFavouritesLocalStorage();
    }

    console.log(this.favouritePokemonSpeciesList);
  }

  
  isFavouritePokemonSpecies(pokedexNumber: number): boolean
  {
    if (this.favouritePokemonSpeciesList.indexOf(pokedexNumber) == -1)
    {
      return false;
    }

    return true;
  }


  saveFavouritesLocalStorage()
  {
    let favouriteListString = '';

    if (this.favouritePokemonSpeciesList.length == 0)
    {
      localStorage.setItem(this.favouriteLocalStorageKey, favouriteListString);
    }
    else
    {
      for (let index = 0; index < this.favouritePokemonSpeciesList.length-1; index++)
      {
        favouriteListString += this.favouritePokemonSpeciesList[index] + '-';
      }

      favouriteListString += this.favouritePokemonSpeciesList[this.favouritePokemonSpeciesList.length-1];

      localStorage.setItem(this.favouriteLocalStorageKey, favouriteListString);
      console.log(localStorage);
    }

    console.log(this.favouritePokemonSpeciesList);
  }


  clearFavouriteList()
  {
    this.favouritePokemonSpeciesList = [];
    localStorage.setItem(this.favouriteLocalStorageKey, '');

    console.log(localStorage);
    console.log(this.favouritePokemonSpeciesList);
  }


  reloadFavouriteList()
  {
    if (localStorage)
    {
      let favouriteListString = localStorage.getItem(this.favouriteLocalStorageKey);
      console.log(favouriteListString);
      this.favouritePokemonSpeciesList = [];

      if (favouriteListString == null)
      {
        localStorage.setItem(this.favouriteLocalStorageKey, '');
      }
      else if(favouriteListString !== '')
      {
        console.log('FAILURE OF INFITY!');

        {
          if (favouriteListString.includes('-'))
          {
            let favouriteArray = favouriteListString.split('-');
  
            favouriteArray.forEach(pokedexNumber => {
              this.favouritePokemonSpeciesList.push(parseInt(pokedexNumber));
            });
          }
          else
          {
            if (favouriteListString != null)
              this.favouritePokemonSpeciesList.push(parseInt(favouriteListString));
          }
        }
      }
    }

    console.log(this.favouritePokemonSpeciesList);
    console.log(localStorage.getItem(this.favouriteLocalStorageKey));
  }

  /* =====> UNUSED <=====
  removeAllNaN()
  {
    for (let index = 0; index < this.favouritePokemonSpeciesList.length; index++)
    {
      if (Number.isNaN(this.favouritePokemonSpeciesList[index]))
      {
        this.favouritePokemonSpeciesList.splice(index, 1);
      }
    }
  }*/


  // ===========================================================================================================================================================
  // ============================================================> GETTERS - HTTP REQUESTS <====================================================================
  // ===========================================================================================================================================================


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



  // ===========================================================================================================================================================
  // ==============================================================> UTILITY - METHODS <========================================================================
  // ===========================================================================================================================================================


  getEntryByLanguage(flavorTextEntries: any[], language: string): string[]
  {
    let finalEntries: string[] = [];
    
    let entryText = '';
    flavorTextEntries.forEach(entry => {
        if (entry.language != undefined && entry.language != null && entry.language.name == language)
        {
          entryText = entry.flavor_text;
          entryText = entryText.replace(/\f/g,' ');
          entryText = entryText.replace('POKéMON', 'Pokémon');
          entryText = entryText.trim();

          if (!finalEntries.includes(entryText))
          {
            finalEntries.push(entryText);
          }
        }
    });

    return finalEntries;
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

}
