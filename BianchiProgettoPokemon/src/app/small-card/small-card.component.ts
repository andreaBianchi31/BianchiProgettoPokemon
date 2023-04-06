import { Component, Input } from '@angular/core';
import { PokedexService } from '../common/pokedex.service';
import { Pokemon } from '../common/pokemon';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent
{
  //pokemon: Pokemon;

  artwork: string;
  officialArtworkNormal: string;
  officialArtworkShiny: string;
  isShiny: boolean;

  redStar: string;
  redStarNormal: string;
  redStarShiny: string;


  constructor(pokedex: PokedexService)
  {
    this.officialArtworkNormal = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/800.png';
    this.officialArtworkShiny = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/800.png';

    this.redStarNormal = '../assets/images/star-icon-red-normal.png';
    this.redStarShiny = '../assets/images/star-icon-red-shiny.png';

    this.redStar = this.redStarNormal;
    this.artwork = this.officialArtworkNormal;
    this.isShiny = false;
  }


  invertArtwork()
  {
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

    this.isShiny = !this.isShiny;
  }

  
}
