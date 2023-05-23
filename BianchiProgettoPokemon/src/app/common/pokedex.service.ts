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
    //Se il pokemon (numero di pokedex) non è gia presente nella lista...
    if (this.favouritePokemonSpeciesList.indexOf(pokedexNumber) == -1)
    {
      //Aggiunge il pokemon (numero di pokedex) alla lista
      this.favouritePokemonSpeciesList.push(pokedexNumber);

      //Ordina la lista
      this.sortFavouritePokemonList();

      //Salva la lista aggiornata nel local storage
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
    else //Cerca il pokemon (numero di pokedex) nella lista
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

      //Salva la lista aggiornata nel local storage
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

    // Se la lista è vuota, salva la lista vuota
    if (this.favouritePokemonSpeciesList.length == 0)
    {
      localStorage.setItem(this.favouriteLocalStorageKey, favouriteListString);
    }
    else
    {
      //Forma la stringa con i singoli numeri di pokedex, separati da "-"
      for (let index = 0; index < this.favouritePokemonSpeciesList.length-1; index++)
      {
        favouriteListString += this.favouritePokemonSpeciesList[index] + '-';
      }

      //Aggiunge alla stringa l'ultimo numero di pokedex
      favouriteListString += this.favouritePokemonSpeciesList[this.favouritePokemonSpeciesList.length-1];

      //Salva la stringa completa nel localstorage
      localStorage.setItem(this.favouriteLocalStorageKey, favouriteListString);
      //console.log(localStorage);
    }

    console.log(this.favouritePokemonSpeciesList);
  }


  //Svuota tutta la lista e il local storage
  clearFavouriteList()
  {
    this.favouritePokemonSpeciesList = [];
    localStorage.setItem(this.favouriteLocalStorageKey, '');

    //console.log(localStorage);
    //console.log(this.favouritePokemonSpeciesList);
  }


  //Ricarica la lista dei preferiti, prendendo i valori dal local storage
  reloadFavouriteList()
  {
    if (localStorage) //Controllo se il browser supporta il local storage
    {
      let favouriteListString = localStorage.getItem(this.favouriteLocalStorageKey);
      this.favouritePokemonSpeciesList = [];

      //Se non esiste il valore dei preferiti da noi utilizzato nel localstorage, lo "creo"
      if (favouriteListString == null)
      {
        localStorage.setItem(this.favouriteLocalStorageKey, '');
      }
      else if(favouriteListString !== '') //Se la lista non è vuota...
      {
        //Se la lista del local storage contiene più di 1 elemento, divide gli elementi e gli aggiunge all lista dei preferiti
        if (favouriteListString.includes('-'))
        {
          let favouriteArray = favouriteListString.split('-');
          favouriteArray.forEach(pokedexNumber => {
            this.favouritePokemonSpeciesList.push(parseInt(pokedexNumber));
          });
        }
        else //Se la lista del local storage contiene 1 solo elemento, inserisce nella lista dei preferiti l'unico valore nel local storage
        {
          if (favouriteListString != null)
            this.favouritePokemonSpeciesList.push(parseInt(favouriteListString));
        }
      }
    }

    console.log(this.favouritePokemonSpeciesList);
    console.log(localStorage.getItem(this.favouriteLocalStorageKey));
  }


  /* =====> UNUSED <=====
  //Rimuove tutti i valori "NaN" presenti nella lista
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
        //Se la lingua è quella inglese, aggiunge la entry
        if (entry.language != undefined && entry.language != null && entry.language.name == language)
        {
          entryText = entry.flavor_text;
          entryText = entryText.replace(/\f/g,' '); //Trasforma le frecce in spazi
          entryText = entryText.replace('POKéMON', 'Pokémon');
          entryText = entryText.trim();

          finalEntries.push(entryText);
        }
    });

    return finalEntries;
  }


  //Ordine una lista di Pokemon
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


  //Ordina una lista di Pokemon Species
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
