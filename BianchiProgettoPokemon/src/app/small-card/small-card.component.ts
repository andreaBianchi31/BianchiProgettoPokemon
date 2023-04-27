import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';
import { Pokemon } from '../common/pokemon';
import { PokemonSpecies } from '../common/pokemon-species';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent
{
  @Input() pokemonSpecies: PokemonSpecies;
  @Output() pokemonForm = new EventEmitter<Pokemon>();

  missingNumberArtwork: string = this.pokedex.basePath + '/utility/pokeball-icon.png';

  redStarNormal: string = this.pokedex.basePath + '/star-icon-red-normal.png';
  redStarShiny: string = this.pokedex.basePath + '/star-icon-red-shiny.png';
  redStar: string = this.redStarNormal;
  isFavourite: boolean;

  favouriteNo: string = this.pokedex.basePath + '/heart-icon-normal.png';
  favouriteYes: string = this.pokedex.basePath + '/heart-icon-favourite.png';
  favourite: string = this.favouriteNo;
  isShiny: boolean;


  constructor(private pokedex: PokedexService)
  {
    this.pokemonSpecies = new PokemonSpecies(0, [], [], false, false, false, [], '', '', '', [], pokedex);

    this.redStar = this.redStarNormal;
    this.isShiny = false;
    this.isFavourite = false;
  }

  
  ngOnInit()
  {
    this.redStarNormal = this.pokedex.basePath + '/star-icon-red-normal.png';
    this.redStarShiny = this.pokedex.basePath + '/star-icon-red-shiny.png';

    this.redStar = this.redStarNormal;
    this.isShiny = false;
    this.isFavourite = false;
  }


  clickCard()
  {
    this.pokemonForm.emit(this.pokemonSpecies.defaultPokemon);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  
}
