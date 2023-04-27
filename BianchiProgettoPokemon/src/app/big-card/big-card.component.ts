import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { PokedexService } from '../common/pokedex.service';
import { Pokemon } from '../common/pokemon';
import { PokemonSpecies } from '../common/pokemon-species';

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css']
})
export class BigCardComponent
{
  @Input() currentPokemon: Pokemon | null = null;
  @Output() newSelectedForm = new EventEmitter<Pokemon>();

  ngOnChanges(changes: SimpleChanges)
  {
    this.artwork = changes['currentPokemon'].currentValue.pixelFrontDefault;

    this.redStar = this.redStarNormal;
    this.arrow = this.arrowFront;
    this.heart = this.heartNormal;

    this.isFront = true;
    this.isShiny = false;

    if (this.currentPokemon != null && this.pokedex.isFavouritePokemon(this.currentPokemon))
    {
      this.heart = this.heartFavourite;
    }
    else
    {
      this.heart = this.heartNormal;
    }
  }

  artwork: string = '';
  isFront: boolean = true;
  isShiny: boolean = false;

  basePath: string = '../assets/images/utility/'

  redStarNormal: string = this.basePath + 'star-icon-red-normal.png';
  redStarShiny: string = this.basePath + 'star-icon-red-shiny.png';
  redStar: string = this.redStarNormal;

  arrowFront: string = this.basePath + 'arrow-icon-front.png';
  arrowBack: string = this.basePath + 'arrow-icon-back.png';
  arrow: string = this.arrowFront;

  heartNormal: string = this.basePath + 'heart-icon-normal.png';
  heartFavourite: string = this.basePath + 'heart-icon-favourite.png';
  heart: string = this.heartNormal;

  constructor(private pokedex: PokedexService)
  {
    this.currentPokemon = null;
  }


  changeFrontBack()
  {
    if (this.currentPokemon != null)
    {
      if (this.isFront)
      {
        if (this.isShiny)
          this.artwork = this.currentPokemon.pixelBackShiny;
        else
          this.artwork = this.currentPokemon.pixelBackDefault;
        
        this.isFront = false;
        this.arrow = this.arrowBack;
      }
      else
      {
        if (this.isShiny)
          this.artwork = this.currentPokemon.pixelFrontShiny;
        else
          this.artwork = this.currentPokemon.pixelFrontDefault;
        
        this.isFront = true;
        this.arrow = this.arrowFront;
      }
    }
  }

  changeShiny()
  {
    if (this.currentPokemon != null)
    {
      if (this.isShiny)
      {
        if (this.isFront)
          this.artwork = this.currentPokemon.pixelFrontDefault;
        else
          this.artwork = this.currentPokemon.pixelBackDefault;
        
        this.isShiny = false;
        this.redStar = this.redStarNormal;
      }
      else
      {
        if (this.isFront)
          this.artwork = this.currentPokemon.pixelFrontShiny;
        else
          this.artwork = this.currentPokemon.pixelBackShiny;
        
        this.isShiny = true;
        this.redStar = this.redStarShiny;
      }
    }
  }

  changeFavourite()
  {
    if (this.currentPokemon != null)
    {
      if (this.pokedex.isFavouritePokemon(this.currentPokemon))
      {
        this.pokedex.removeFavouritePokemonSpecies(this.currentPokemon);
        this.heart = this.heartNormal;
      }
      else
      {
        this.pokedex.addFavouritePokemonSpecies(this.currentPokemon);
        this.heart = this.heartFavourite;
      }
    }
  }

  changeCurrentPokemon(pokemon: Pokemon)
  {
    this.newSelectedForm.emit(pokemon);
    console.log(pokemon);
  }
}
