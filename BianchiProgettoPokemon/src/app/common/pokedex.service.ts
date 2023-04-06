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

  listaPokemon: Pokemon[] = [];
  //currentPokemon: Pokemon = this.getPokemonByID('pikachu');


  constructor(private httpAssistant: HttpClient)
  {
  }


  getPokemonList(): Pokemon[]
  {
    return this.listaPokemon;
  }


  /*getCurrentPokemon(): Pokemon
  {
    //return this.currentPokemon;
  }*/


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


  getPokemonSpeciesByURL(url: string): Observable<any>
  {
    return this.httpAssistant.get(url);
  }


  getPokemonByType(type: string): Observable<any>
  {
    return this.httpAssistant.get(this.searchType + type);
  }


  getPokemonByEvolutionChian(evolutionChain: string): Observable<any>
  {
    return this.httpAssistant.get(this.searchEvolutionChain + evolutionChain);
  }


  getPokemonForms(name: string)
  {

  }
}
