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

}
