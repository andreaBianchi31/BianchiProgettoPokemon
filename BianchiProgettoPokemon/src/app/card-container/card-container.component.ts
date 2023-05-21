import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';
import { Pokemon } from '../common/pokemon';
import { Title } from '@angular/platform-browser';
import { PokemonSpecies } from '../common/pokemon-species';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css']
})
export class CardContainerComponent
{
  @Input() pokemonList: PokemonSpecies[] = [];
  @Input() datiDisponibili: boolean = false;

  @Output() pokemonForm = new EventEmitter<Pokemon>();
  @Output() reloadList = new EventEmitter();

  
  modificaPokemon(pokemon: Pokemon)
  {
    this.pokemonForm.emit(pokemon);
  }

  
  reloadPokemonList()
  {
    this.reloadList.emit();
  }

}