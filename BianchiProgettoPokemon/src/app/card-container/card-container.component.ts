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


  // (click su una small-card) => manda a MaxiContainer il pokemon scelto
  modificaPokemon(pokemon: Pokemon)
  {
    this.pokemonForm.emit(pokemon);
  }


  // (click sul pulsante reload) => Ricarica tutta la lista dei pokemon (ordina a MaxiContainer di rifare la chiamata di GET)
  reloadPokemonList()
  {
    this.reloadList.emit();
  }

}