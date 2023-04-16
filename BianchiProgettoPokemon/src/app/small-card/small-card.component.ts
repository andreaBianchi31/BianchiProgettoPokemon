import { Component, Input } from '@angular/core';
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
  @Input() pokemon: PokemonSpecies;

  /*artwork: string;
  officialArtworkNormal: string;
  officialArtworkShiny: string;*/

  missingNumberArtwork: string = '../assets/images/utility/pokeball-icon.png';

  redStarNormal: string = '../assets/images/star-icon-red-normal.png';
  redStarShiny: string = '../assets/images/star-icon-red-shiny.png';
  redStar: string = this.redStarNormal;
  isFavourite: boolean;

  favouriteNo: string = '../assets/images/heart-icon-normal.png';
  favouriteYes: string = '../assets/images/heart-icon-favourite.png';
  favourite: string = this.favouriteNo;
  isShiny: boolean;


  constructor(private pokedex: PokedexService)
  {
    this.pokemon = new PokemonSpecies(0, [], [], false, false, false, [], '', '', '', [], pokedex);

    this.redStarNormal = '../assets/images/star-icon-red-normal.png';
    this.redStarShiny = '../assets/images/star-icon-red-shiny.png';

    this.redStar = this.redStarNormal;
    this.isShiny = false;
    this.isFavourite = false;
  }

  ngOnInit()
  {
    this.redStarNormal = '../assets/images/star-icon-red-normal.png';
    this.redStarShiny = '../assets/images/star-icon-red-shiny.png';

    this.redStar = this.redStarNormal;
    this.isShiny = false;
    this.isFavourite = false;
  }


  invertArtwork()
  {/*
    if (this.isShiny)
    {
      this.artwork = this.officialArtworkNormal;
      this.redStar = this.redStarNormal;
    }
    else
    {
      this.artwork = this.officialArtworkShiny;
      this.redStar = this.redStarShiny;
    }

    this.isShiny = !this.isShiny;*/
  }

  
  invertFavourite()
  {/*
    if (this.isFavourite)
    {
      this.favourite = this.favouriteNo;
      this.pokedex.removeFavouritePokemon(this.pokemon);
    }
    else
    {
      this.favourite = this.favouriteYes;
      this.pokedex.addFavouritePokemon(this.pokemon);
    }

    this.isFavourite = !this.isFavourite;*/
  }
  
}
