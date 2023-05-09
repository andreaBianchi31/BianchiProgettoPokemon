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
  /*missingNumberNormal: string = this.basePath + '/missing-number/missing-number-normal.jpg';
  missingNumberShiny: string = this.basePath + '/missing-number/missing-number-shiny.jpg';
  missingNumberSprite: string = this.basePath + '/missing-number/missing-number-sprite.png';*/
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


  // ===========================================================================================================
  

  getFavouritePokemonList(): number[]
  {
    this.sortFavouritePokemonList;
    return this.favouritePokemonSpeciesList;
  }


  sortFavouritePokemonList()
  {
    for(let i = 0; i <= this.favouritePokemonSpeciesList.length-1; i++)
    {
        for(let j = 0; j < (this.favouritePokemonSpeciesList.length-i-1); j++)
        {
          if(Number.isNaN(this.favouritePokemonSpeciesList[j]) || this.favouritePokemonSpeciesList[j] == undefined)
          {
            this.favouritePokemonSpeciesList.splice(j, 1);
          }

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
      console.log(this.favouritePokemonSpeciesList);

      this.saveFavouritesLocalStorage();
    }
    else
    {
      console.log('Pokémon #' + pokedexNumber + ' is already one of your favourite pokemon!')
    }
  }


  removeFavouritePokemonSpecies(pokedexNumber: number)
  {
    if (this.favouritePokemonSpeciesList.indexOf(pokedexNumber) == -1)
    {
      console.log('Pokémon #' + pokedexNumber + ' does not exist!')
    }
    else
    {
      this.favouritePokemonSpeciesList.splice(this.favouritePokemonSpeciesList.indexOf(pokedexNumber), 1);
      this.sortFavouritePokemonList();

      console.log(this.favouritePokemonSpeciesList);

      this.saveFavouritesLocalStorage();
    }
  }

  
  isFavouritePokemonSpecies(pokedexNumber: number): boolean
  {
    if (this.favouritePokemonSpeciesList.indexOf(pokedexNumber) == -1)
    {
      return false;
    }
    else
    {
      return true;
    }
  }


  saveFavouritesLocalStorage()
  {
    let favouriteListString = '';

    for (let i = 0; i < this.favouritePokemonSpeciesList.length-1; i++)
    {
      if (i < this.favouritePokemonSpeciesList.length-1)
      {
        favouriteListString += this.favouritePokemonSpeciesList[i] + '-';
      }
    }

    favouriteListString += this.favouritePokemonSpeciesList[this.favouritePokemonSpeciesList.length-1];

    localStorage.setItem(this.favouriteLocalStorageKey, favouriteListString);

    console.log('Local Storage: ' + localStorage.getItem(this.favouriteLocalStorageKey));
  }


  clearFavouriteList()
  {
    this.favouritePokemonSpeciesList = [];
    localStorage.setItem(this.favouriteLocalStorageKey, '');

    console.log(localStorage);
  }


  reloadFavouriteList()
  {
    if (localStorage)
    {
      let favouriteList = localStorage.getItem(this.favouriteLocalStorageKey)?.split('-');
      this.favouritePokemonSpeciesList = [];

      if (favouriteList)
      {
        favouriteList.forEach(number => {
          this.favouritePokemonSpeciesList.push(parseInt(number));
        });
      }
    }
    else
    {
      this.favouritePokemonSpeciesList = [];
    }
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

    // Elimina i duplicati
    for (let i = 0; i < finalEntries.length; i++)
    {
      for (let j = i; j < finalEntries.length; j++)
      {
        if (finalEntries[i].toUpperCase() == finalEntries[j].toUpperCase())
          finalEntries.splice(j, 1);
      }
    }

    return finalEntries;
  }

}
