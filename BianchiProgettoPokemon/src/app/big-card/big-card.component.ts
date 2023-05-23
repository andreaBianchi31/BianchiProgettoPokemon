import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { PokedexService } from '../common/pokedex.service';
import { Pokemon } from '../common/pokemon';
import { PokemonSpecies } from '../common/pokemon-species';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css']
})
export class BigCardComponent
{
  @Input() currentPokemon: Pokemon | null = null;                   //Pokemon selezionato
  @Output() newSelectedForm = new EventEmitter<Pokemon | null>();   //(click su varieties) => cambio pokemon selezionato (forma alternativa)
  @Output() reloadFavouriteList = new EventEmitter();               //(click sul cuore) => ricarica lista dei preferiti, se il parametro di ricerca è "favourites"
  
  artwork: string = this.pokedex.basePath + '/utility/pokeball-icon.png';
  isFront: boolean = true;
  isShiny: boolean = false;

  redStarNormal: string = this.pokedex.basePath + '/utility/star-icon-red-normal.png';
  redStarShiny: string = this.pokedex.basePath + '/utility/star-icon-red-shiny.png';
  redStar: string = this.redStarNormal;

  arrowFront: string = this.pokedex.basePath + '/utility/arrow-icon-front.png';
  arrowBack: string = this.pokedex.basePath + '/utility/arrow-icon-back.png';
  arrow: string = this.arrowFront;

  heartNormal: string = this.pokedex.basePath + '/utility/heart-icon-normal.png';
  heartFavourite: string = this.pokedex.basePath + '/utility/heart-icon-favourite.png';
  heart: string = this.heartNormal;


  constructor(private pokedex: PokedexService, private title: Title)
  {
    this.currentPokemon = null;
  }


  ngOnChanges(changes: SimpleChanges)
  {
    if (changes['currentPokemon'].currentValue != null)
    {
      // Reset immagini
      this.artwork = changes['currentPokemon'].currentValue.pixelFrontDefault;

      this.redStar = this.redStarNormal;
      this.arrow = this.arrowFront;
      this.heart = this.heartNormal;
  
      this.isFront = true;
      this.isShiny = false;

      // Controllo se il nuovo pokemon è preferito
      if (this.currentPokemon != null && this.pokedex.isFavouritePokemonSpecies(this.currentPokemon.pokedexNumber))
      {
        this.heart = this.heartFavourite;
      }
      else
      {
        this.heart = this.heartNormal;
      }
    }
  }


  // Cambio fronte-retro
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


  // Cambio normale-shiny (colore alternativo)
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


  //Cambio preferito
  changeFavourite()
  {
    if (this.currentPokemon != null)
    {
      //Se il pokemon è già preferito, lo rimuovi dai preferiti
      if (this.pokedex.isFavouritePokemonSpecies(this.currentPokemon.pokedexNumber))
      {
        this.pokedex.removeFavouritePokemonSpecies(this.currentPokemon.pokedexNumber);
        this.heart = this.heartNormal;
        this.reloadFavouriteList.emit(); //Ricarica la lista dei preferiti se la selezione è "favourites"
      }
      else //Altrimenti, aggiunti il nuovo pokemon ai preferiti
      {
        this.pokedex.addFavouritePokemonSpecies(this.currentPokemon.pokedexNumber);
        this.heart = this.heartFavourite;
      }

    }
  }


  // Cambio pokemon (forma alternativa)
  changeCurrentPokemon(pokemon: Pokemon)
  {
    this.newSelectedForm.emit(pokemon);
    this.title.setTitle('Pokédex | ' + pokemon.name);
  }

}
