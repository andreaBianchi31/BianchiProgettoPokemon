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
  @Input() pokemon: Pokemon;

  name: string;
  artwork: string;
  officialArtworkNormal: string;
  officialArtworkShiny: string;
  isShiny: boolean;

  redStar: string;
  redStarNormal: string;
  redStarShiny: string;


  constructor(pokedex: PokedexService)
  {
    this.pokemon = new Pokemon (10000, 'SEES di Prova', '', '');
    this.name = this.pokemon.name;
    this.officialArtworkNormal = this.pokemon.officialArtworkNormal;
    this.officialArtworkShiny = this.pokemon.officialArtworkShiny;

    this.redStarNormal = '../assets/images/star-icon-red-normal.png';
    this.redStarShiny = '../assets/images/star-icon-red-shiny.png';

    this.redStar = this.redStarNormal;
    this.artwork = this.officialArtworkNormal;
    this.isShiny = false;
  }

  ngOnInit()
  {
    this.name = this.pokemon.name;
    this.officialArtworkNormal = this.pokemon.officialArtworkNormal;
    this.officialArtworkShiny = this.pokemon.officialArtworkShiny;

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
